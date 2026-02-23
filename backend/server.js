const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'kodbank_secret';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log('🔑 API Key configured:', !!GEMINI_API_KEY);
console.log('🔑 API Key length:', GEMINI_API_KEY ? GEMINI_API_KEY.length : 0);

// Initialize Gemini AI
let genAI = null;
let geminiModel = null;

try {
  if (GEMINI_API_KEY && GEMINI_API_KEY.trim()) {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY.trim());
    geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    console.log('✅ Gemini AI initialized successfully');
  } else {
    console.log('⚠️ No Gemini API key provided');
  }
} catch (error) {
  console.error('❌ Error initializing Gemini AI:', error.message);
}

// Middleware
// Allow requests from Vercel domains and localhost
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000'
];

// Add your Vercel frontend domain here after deployment
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Database connections
const authDb = new sqlite3.Database('./KodBankAuth.db', (err) => {
  if (err) console.error('Auth DB Error:', err);
  else console.log('✓ Connected to KodBankAuth.db');
});

const bankDb = new sqlite3.Database('./KodBank.db', (err) => {
  if (err) console.error('Bank DB Error:', err);
  else console.log('✓ Connected to KodBank.db');
});

// Promisify database runs
const dbRun = (db, sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const dbGet = (db, sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (db, sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
};

// Initialize databases
async function initializeDatabases() {
  try {
    // Auth database tables
    await dbRun(authDb, `
      CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dbRun(authDb, `
      CREATE TABLE IF NOT EXISTS user_tokens (
        token_id INTEGER PRIMARY KEY AUTOINCREMENT,
        token_value TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        expiry TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      )
    `);

    // Bank database tables
    await dbRun(bankDb, `
      CREATE TABLE IF NOT EXISTS accounts (
        account_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        account_number TEXT UNIQUE NOT NULL,
        account_type TEXT NOT NULL,
        account_name TEXT NOT NULL,
        balance REAL DEFAULT 1000,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dbRun(bankDb, `
      CREATE TABLE IF NOT EXISTS transactions (
        transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        from_account TEXT NOT NULL,
        to_account TEXT NOT NULL,
        amount REAL NOT NULL,
        transaction_type TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✓ Database tables initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Initialize on startup
initializeDatabases();

// Authentication Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify JWT signature
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if token exists in database
    const tokenRecord = await dbGet(authDb, 
      'SELECT * FROM user_tokens WHERE token_value = ? AND expiry > datetime("now")',
      [token]
    );

    if (!tokenRecord) {
      return res.status(401).json({ message: 'Token invalid or expired' });
    }

    // Get user
    const user = await dbGet(authDb, 
      'SELECT user_id, name, email FROM users WHERE user_id = ?',
      [decoded.user_id]
    );

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Routes

// ===== AUTH ROUTES =====

// Register
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if email exists (case-insensitive)
    const existingUser = await dbGet(authDb,
      'SELECT * FROM users WHERE LOWER(email) = LOWER(?)',
      [email]
    );

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await dbRun(authDb,
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const userId = result.lastID;

    // Create default "Savings" account
    const accountNumber = `KB${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    await dbRun(bankDb,
      'INSERT INTO accounts (user_id, account_number, account_type, account_name, balance) VALUES (?, ?, ?, ?, ?)',
      [userId, accountNumber, 'Savings', 'My Savings Account', 1000]
    );

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    // Find user with case-insensitive email
    const user = await dbGet(authDb,
      'SELECT * FROM users WHERE LOWER(email) = LOWER(?)',
      [email]
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { user_id: user.user_id },
      JWT_SECRET,
      { expiresIn: '30m' }
    );

    // Calculate expiry time
    const expiryTime = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    // Store token in database
    await dbRun(authDb,
      'INSERT INTO user_tokens (token_value, user_id, expiry) VALUES (?, ?, ?)',
      [token, user.user_id, expiryTime]
    );

    // Set cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: 30 * 60 * 1000
    });

    res.json({
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Logout
app.post('/api/logout', verifyToken, async (req, res) => {
  const token = req.cookies.authToken;

  try {
    // Delete token from database
    await dbRun(authDb,
      'DELETE FROM user_tokens WHERE token_value = ?',
      [token]
    );

    // Clear cookie
    res.clearCookie('authToken');

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed' });
  }
});

// Get current user
app.get('/api/me', verifyToken, async (req, res) => {
  res.json({
    user: {
      user_id: req.user.user_id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

// ===== ACCOUNT ROUTES =====

// Create account
app.post('/api/accounts', verifyToken, async (req, res) => {
  const { account_type, account_name } = req.body;
  const userId = req.user.user_id;

  if (!account_type || !account_name) {
    return res.status(400).json({ message: 'Account type and name required' });
  }

  try {
    const accountNumber = `KB${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const result = await dbRun(bankDb,
      'INSERT INTO accounts (user_id, account_number, account_type, account_name, balance) VALUES (?, ?, ?, ?, ?)',
      [userId, accountNumber, account_type, account_name, 1000]
    );

    res.status(201).json({
      message: 'Account created',
      account: {
        account_id: result.lastID,
        account_number: accountNumber,
        account_type,
        account_name,
        balance: 1000
      }
    });
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ message: 'Failed to create account' });
  }
});

// Get all accounts for user
app.get('/api/accounts', verifyToken, async (req, res) => {
  const userId = req.user.user_id;

  try {
    const accounts = await dbAll(bankDb,
      'SELECT * FROM accounts WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    res.json({ accounts });
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({ message: 'Failed to fetch accounts' });
  }
});

// Get account by account number
app.get('/api/accounts/:accountNumber', verifyToken, async (req, res) => {
  const { accountNumber } = req.params;
  const userId = req.user.user_id;

  try {
    const account = await dbGet(bankDb,
      'SELECT * FROM accounts WHERE account_number = ? AND user_id = ?',
      [accountNumber, userId]
    );

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({ account });
  } catch (error) {
    console.error('Get account error:', error);
    res.status(500).json({ message: 'Failed to fetch account' });
  }
});

// Get balance
app.get('/api/balance/:accountNumber', verifyToken, async (req, res) => {
  const { accountNumber } = req.params;
  const userId = req.user.user_id;

  try {
    const account = await dbGet(bankDb,
      'SELECT balance FROM accounts WHERE account_number = ? AND user_id = ?',
      [accountNumber, userId]
    );

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({ balance: account.balance });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ message: 'Failed to fetch balance' });
  }
});

// ===== TRANSACTION ROUTES =====

// Transfer money
app.post('/api/transfer', verifyToken, async (req, res) => {
  const { from_account, to_account, amount, description } = req.body;
  const userId = req.user.user_id;

  if (!from_account || !to_account || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' });
  }

  try {
    // Verify from_account belongs to user
    const fromAcc = await dbGet(bankDb,
      'SELECT * FROM accounts WHERE account_number = ? AND user_id = ?',
      [from_account, userId]
    );

    if (!fromAcc) {
      return res.status(403).json({ message: 'From account not found' });
    }

    // Get to_account (doesn't need to belong to user)
    const toAcc = await dbGet(bankDb,
      'SELECT * FROM accounts WHERE account_number = ?',
      [to_account]
    );

    if (!toAcc) {
      return res.status(404).json({ message: 'To account not found' });
    }

    // Check sufficient balance
    if (fromAcc.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct from sender
    await dbRun(bankDb,
      'UPDATE accounts SET balance = balance - ? WHERE account_number = ?',
      [amount, from_account]
    );

    // Add to receiver
    await dbRun(bankDb,
      'UPDATE accounts SET balance = balance + ? WHERE account_number = ?',
      [amount, to_account]
    );

    // Record transaction
    const result = await dbRun(bankDb,
      'INSERT INTO transactions (from_account, to_account, amount, transaction_type, description) VALUES (?, ?, ?, ?, ?)',
      [from_account, to_account, amount, 'Transfer', description || 'Transfer between accounts']
    );

    res.status(201).json({
      message: 'Transfer successful',
      transaction: {
        transaction_id: result.lastID,
        from_account,
        to_account,
        amount,
        transaction_type: 'Transfer'
      }
    });
  } catch (error) {
    console.error('Transfer error:', error);
    res.status(500).json({ message: 'Transfer failed' });
  }
});

// Get all transactions
app.get('/api/transactions', verifyToken, async (req, res) => {
  const userId = req.user.user_id;

  try {
    // Get all account numbers for user
    const userAccounts = await dbAll(bankDb,
      'SELECT account_number FROM accounts WHERE user_id = ?',
      [userId]
    );

    const accountNumbers = userAccounts.map(a => a.account_number);

    if (accountNumbers.length === 0) {
      return res.json({ transactions: [] });
    }

    // Get transactions for user's accounts
    const placeholders = accountNumbers.map(() => '?').join(',');
    const transactions = await dbAll(bankDb,
      `SELECT * FROM transactions 
       WHERE from_account IN (${placeholders}) OR to_account IN (${placeholders})
       ORDER BY created_at DESC`,
      [...accountNumbers, ...accountNumbers]
    );

    res.json({ transactions });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
});

// ===== CHATBOT ROUTE =====

app.post('/api/chatbot', verifyToken, async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    console.log('💬 Chatbot request:', message.substring(0, 50) + '...');
    console.log('🤖 Gemini Model available:', !!geminiModel);
    
    // If Gemini API is configured, use it; otherwise use fallback
    if (geminiModel) {
      try {
        console.log('📡 Calling Gemini API...');
        
        const systemPrompt = `You are a professional banking assistant. Provide expert guidance on:
- Bank accounts, transfers, and payments
- Balance inquiries and statements
- Banking security and fraud prevention
- Interest rates and financial products
- Credit and debit cards
- Loans and investments
- General banking concepts

Answer questions comprehensively and professionally about ANY banking topic from any bank or financial institution.`;

        const fullPrompt = `${systemPrompt}\n\nUser question: ${message}`;
        
        const result = await geminiModel.generateContent(fullPrompt);
        const reply = result.response.text();
        
        console.log('✅ Gemini response received:', reply.substring(0, 50) + '...');
        return res.json({ reply });
        
      } catch (apiError) {
        console.error('❌ Gemini API Error:', apiError.message);
        console.log('⚠️ Falling back to hardcoded responses');
        
        // Fallback to hardcoded response
        const fallbackReply = await generateFallbackResponse(message);
        return res.json({ reply: fallbackReply });
      }
    } else {
      console.log('⚠️ Gemini not initialized, using fallback');
      const fallbackReply = await generateFallbackResponse(message);
      return res.json({ reply: fallbackReply });
    }
  } catch (error) {
    console.error('❌ Chatbot endpoint error:', error.message);
    console.error('Stack:', error.stack);
    
    // Final fallback
    const fallbackReply = 'I apologize, but I encountered an issue. Please try rephrasing your banking question.';
    return res.json({ reply: fallbackReply });
  }
});

// Fallback chatbot response function (when API key is not available)
async function generateFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "👋 Hello! Welcome to KodBank. I'm your AI assistant. How can I help you with your banking needs today?";
  } else if (lowerMessage.includes('account') && (lowerMessage.includes('create') || lowerMessage.includes('open'))) {
    return "📱 You can easily create a new account by clicking the 'Add Account' button on your dashboard. Choose your account type (Savings, Checking, etc.) and give it a name. Your new account will be ready instantly with $1,000!";
  } else if (lowerMessage.includes('transfer')) {
    return "💸 To transfer money, go to the 'Transfer' section. Select your from account, enter the recipient's account number, amount, and description. Click 'Send Money' to complete the transfer instantly. Your funds will be transferred securely!";
  } else if (lowerMessage.includes('balance')) {
    return "💰 You can check your balance anytime by clicking 'Balance' in the menu. It shows your current balance across all your accounts. You can also see it on your dashboard!";
  } else if (lowerMessage.includes('transaction')) {
    return "📊 Visit the 'Transactions' page to see your complete transaction history. Each transaction shows the date, amount, recipient, and status. You can track all your money movements here!";
  } else if (lowerMessage.includes('security') || lowerMessage.includes('safe')) {
    return "🔐 KodBank uses state-of-the-art security: encrypted passwords, secure JWT tokens, and HTTPOnly cookies. Your data is protected with industry-standard encryption. Never share your password or token with anyone!";
  } else if (lowerMessage.includes('password')) {
    return "🔒 Keep your password secure and never share it. Use a strong password with numbers and special characters. If you suspect unauthorized access, change your password immediately.";
  } else if (lowerMessage.includes('help')) {
    return "🤝 I can help you with:\n- Creating accounts\n- Making transfers\n- Checking balances\n- Viewing transactions\n- Security guidance\n- General banking questions\n\nWhat would you like to know?";
  } else if (lowerMessage.includes('feature')) {
    return "🌟 KodBank features include:\n✓ Multiple accounts per user\n✓ Instant transfers\n✓ Real-time balance updates\n✓ Complete transaction history\n✓ Secure authentication\n✓ 24/7 AI assistant\n\nEnjoy your banking!";
  } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "😊 You're welcome! I'm here anytime you need banking assistance. Feel free to ask your next question!";
  } else {
    return "💡 That's an interesting question! I specialize in banking and KodBank features. Try asking me about accounts, transfers, balances, security, or general banking guidance. How can I assist your banking needs?";
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'KodBank backend is running ✓' });
});

// 404 handler
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🏦 KodBank Backend Server`);
  console.log(`✓ Running on port ${PORT}`);
  console.log(`✓ http://localhost:${PORT}`);
  console.log(`\n📊 Database: SQLite (KodBankAuth.db, KodBank.db)`);
  console.log(`🔐 JWT Secret: ${JWT_SECRET.substring(0, 10)}...`);
  console.log(`\n✓ Ready to accept connections\n`);
});
