# KodBank Setup Instructions

## 🚀 Quick Start Guide

### Step 1: Start the Backend Server

```bash
cd backend
npm install
node server.js
```

**Expected output:**
```
🏦 KodBank Backend Server
✓ Running on port 5000
✓ http://localhost:5000

📊 Database: SQLite (KodBankAuth.db, KodBank.db)
🔐 JWT Secret: kodbank_super...

✓ Ready to accept connections
```

### Step 2: Start the Frontend Application

Open a new terminal and run:

```bash
cd frontend
npm install
npm start

```

**Expected output:**
```
Compiled successfully!

You can now view kodbank-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://[your-ip]:3000
```

### Step 3: Access the Application

1. Open browser → `http://localhost:3000`
2. Click **"Register here"** to create account
3. Fill in your details:
   - Full Name: John Doe
   - Email: john@example.com
   - Password: password123
4. Click **Register**
5. Login with your credentials
6. Enjoy! 🎉

## 📊 What to Try First

### 1. Dashboard
- View your total balance ($1,000 starting)
- See auto-created Savings account
- Check sparkline charts

### 2. Create New Account
- Click "➕ Add Account"
- Name: "Checking Account"
- Type: Checking
- Starts with $1,000

### 3. Make a Transfer
- Click "💸 Transfer"
- From: Savings Account
- To: Your Checking Account number
- Amount: $100
- Click "Send Money"

### 4. Check Transactions
- Click "📜 Transactions"
- See your transfer history
- View dates and amounts

### 5. Chat with AI
- Click the floating "💬" button
- Ask: "How do I transfer money?"
- Get instant banking help!

## 🔧 Troubleshooting

### Backend won't start
```bash
# Make sure port 5000 is free
# Check if you're in the backend folder
# Try: npm install (again)
```

### Frontend won't connect to backend
```bash
# Make sure backend is running on port 5000
# Check proxy setting in frontend/package.json
# Clear browser cache (Ctrl+Shift+Delete)
```

### Database issues
```bash
# Delete KodBankAuth.db and KodBank.db from backend folder
# Restart backend server - databases will be recreated
```

### Port already in use
```bash
# For port 5000: npx kill-port 5000
# For port 3000: npx kill-port 3000
```

## 📱 Features to Explore

✅ **Authentication**
- Register new account
- Login/Logout
- Email validation
- Password hashing

✅ **Accounts**
- View all accounts
- See account details
- Account numbers
- Account types

✅ **Transfers**
- Send money between accounts
- Instant processing
- Transaction descriptions
- Balance validation

✅ **Dashboard**
- Real-time balance updates
- Multiple account overview
- Sparkline charts
- Quick action buttons

✅ **AI Chatbot**
- Banking questions
- Feature explanations
- Security tips
- Helpful guidance

## 🎨 Design Highlights

- 🌌 Glassmorphism cards with blur effects
- ✨ Neon cyan (#00f5ff) primary color
- 💜 Electric purple (#b829dd) for active states
- 💚 Emerald (#00ff9d) for positive balance
- ⚡ 300ms smooth animations
- 🎯 Responsive across all devices

## 🔐 Test Accounts

Create your own through the registration form. 

Example:
```
Email: test@kodbank.com
Password: test@123456
Name: Test User
```

## 📊 Data Storage

- **KodBankAuth.db** - User credentials & tokens
- **KodBank.db** - Accounts & transactions
- Both auto-created on first run

## 💾 Sample Data

After registration, you get:
- ✓ One "Savings" account
- ✓ Starting balance: $1,000
- ✓ UniqueAccount number (KB[timestamp][random])

## 🚀 Next Steps

1. ✅ Install dependencies
2. ✅ Start backend
3. ✅ Start frontend
4. ✅ Register/Login
5. ✅ Create accounts
6. ✅ Make transfers
7. ✅ View transactions
8. ✅ Chat with AI

## 📞 Need Help?

Check the chatbot! Click the purple chat button and ask:
- "How do I create an account?"
- "How do I transfer money?"
- "Is KodBank secure?"
- "How do I check my balance?"

## ✨ You're All Set!

KodBank is ready to use. No additional configuration needed!

Happy banking! 🏦💰
