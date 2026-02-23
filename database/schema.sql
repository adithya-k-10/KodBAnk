-- KodBank Database Schema
-- This schema is auto-created by the backend server

-- ============ KodBankAuth.db ============

-- Users table
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User tokens table (JWT storage)
CREATE TABLE IF NOT EXISTS user_tokens (
  token_id INTEGER PRIMARY KEY AUTOINCREMENT,
  token_value TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  expiry TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ============ KodBank.db ============

-- Accounts table
CREATE TABLE IF NOT EXISTS accounts (
  account_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  account_number TEXT UNIQUE NOT NULL,
  account_type TEXT NOT NULL,
  account_name TEXT NOT NULL,
  balance REAL DEFAULT 1000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_account TEXT NOT NULL,
  to_account TEXT NOT NULL,
  amount REAL NOT NULL,
  transaction_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ Indexes ============

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_tokens_user_id ON user_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_account_number ON accounts(account_number);
CREATE INDEX IF NOT EXISTS idx_transactions_from ON transactions(from_account);
CREATE INDEX IF NOT EXISTS idx_transactions_to ON transactions(to_account);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(created_at);
