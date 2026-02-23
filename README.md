# KodBank - Full Stack Banking Application 🏦

A modern, production-ready digital banking web application built with React, Node.js, Express, and SQLite.

## ✨ Features

- **🔐 Secure Authentication** - JWT tokens, bcrypt password hashing, HTTPOnly cookies
- **💰 Multiple Accounts** - Create and manage multiple bank accounts
- **💸 Money Transfers** - Instant transfers between accounts
- **📊 Dashboard** - Real-time balance overview with sparkline charts
- **📜 Transaction History** - Complete transaction tracking
- **🤖 AI Chatbot** - KodBank AI assistant for banking help
- **🎨 Modern UI** - Glassmorphism design with neon cyan accents
- **📱 Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **SQLite** - Database
- **bcrypt** - Password hashing
- **JWT** - Token authentication
- **CORS** - Cross-origin requests

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Glassmorphism design

## 📁 Project Structure

```
KodBank/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── .env
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Layout.js
│       │   ├── Sidebar.js
│       │   ├── Sparkline.js
│       │   └── Chatbot.js
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.js
│       │   ├── AddAccount.js
│       │   ├── Balance.js
│       │   ├── Transfer.js
│       │   ├── Transactions.js
│       │   └── AccountDetails.js
│       ├── App.js
│       ├── index.js
│       └── index.css
└── database/
    └── schema.sql
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend will be available at `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will open at `http://localhost:3000`

## 📚 API Routes

### Authentication
- `POST /api/register` - Create new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/me` - Get current user

### Accounts
- `POST /api/accounts` - Create new account
- `GET /api/accounts` - Get all user accounts
- `GET /api/accounts/:accountNumber` - Get account details
- `GET /api/balance/:accountNumber` - Get account balance

### Transactions
- `POST /api/transfer` - Transfer money
- `GET /api/transactions` - Get all transactions

### Chatbot
- `POST /api/chatbot` - Chat with AI assistant

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing (10 rounds)
- ✅ HTTPOnly, Secure cookies
- ✅ CORS protection
- ✅ Protected routes
- ✅ Case-insensitive email login
- ✅ Token expiration (30 minutes)
- ✅ Token revocation on logout

## 🎨 Design System

### Colors
- **Neon Cyan** - `#00f5ff` (Primary)
- **Electric Purple** - `#b829dd` (Active state)
- **Emerald** - `#00ff9d` (Positive balance)

### Effects
- Glassmorphism cards with blur effect
- Neon glow animations
- Smooth 300ms transitions
- Hover scale effects (1.02x)

### Typography
- **Font** - Plus Jakarta Sans
- **Sizes** - 1rem body, 2.5rem titles
- **Weights** - 400, 500, 600, 700

## 💡 Features Guide

### Dashboard
- View total balance across accounts
- See all accounts with sparkline charts
- Quick action buttons for transfers, new accounts
- Account status overview

### Create Account
- Easy account creation form
- Choose account type (Savings, Checking, etc.)
- Auto-generated account number
- Starting balance: $1,000

### Transfer Money
- Select from account and recipient
- Instant transfer processing
- Optional transaction description
- Real-time balance updates

### Check Balance
- View balance for any account
- Account number display
- Transaction quick links

### Transaction History
- Complete transaction log
- Incoming and outgoing transfers
- Date and amount info
- Description field

### AI Chatbot
- Available on all pages
- Answers banking questions
- Helpful financial guidance
- Security tips and tricks

## 🔄 Data Flow

1. **User registers** → Backend creates account + default Savings account
2. **User logs in** → JWT token created + stored in database + cookie set
3. **Protected routes** → Verify token signature + check database
4. **Transfer** → Deduct from sender + Add to receiver + Record transaction
5. **User logs out** → Token deleted from database + Cookie cleared

## 📱 Responsive Breakpoints

- Desktop: Full sidebar navigation
- Tablet: Adjusted grid layouts
- Mobile: Stacked layouts, hidden sidebar

## 🐛 Error Handling

- User-friendly error messages
- Form validation
- Balance checking before transfers
- Email uniqueness validation
- Token expiration handling

## 🚀 Deployment

### Frontend (Netlify)
```bash
cd frontend
npm run build
# Deploy 'build' folder to Netlify
```

### Backend (recommended: Heroku, Railway, DigitalOcean)
1. Update `.env` with production values
2. Set `secure: true` for cookies
3. Update proxy in frontend/package.json
4. Deploy using your hosting provider

## 📝 Environment Variables

Create `.env` file in backend/:

```
PORT=5000
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

## 🤖 Chatbot Capabilities

The AI chatbot can answer:
- Account creation and management
- Transfer procedures
- Balance inquiries
- Transaction information
- Security and safety tips
- General banking questions

## 📊 Database Schema

### Users Table
- user_id (PK)
- name
- email (unique)
- password (hashed)
- created_at

### User Tokens Table
- token_id (PK)
- token_value
- user_id (FK)
- expiry
- created_at

### Accounts Table
- account_id (PK)
- user_id
- account_number (unique)
- account_type
- account_name
- balance
- created_at

### Transactions Table
- transaction_id (PK)
- from_account
- to_account
- amount
- transaction_type
- description
- created_at

## 🎯 Testing

### Test Credentials
You can create your own accounts via the registration page.

### Test Flow
1. Register new account
2. Auto-created with $1,000 in savings account
3. Create additional accounts
4. Transfer between accounts
5. Check transaction history
6. Chat with AI assistant

## 📄 License

MIT License - Feel free to use this project for personal or commercial use.

## 👨‍💻 Built With ❤️

Created as a production-ready banking application example with modern web technologies.

---

**Ready to use - No additional setup needed!** 🎉

All dependencies are listed in package.json files. Just install and run!
