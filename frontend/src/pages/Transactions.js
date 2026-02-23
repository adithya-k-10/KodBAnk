import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      // Get user accounts first
      const accountsRes = await axios.get('/api/accounts', { withCredentials: true });
      setUserAccounts(accountsRes.data.accounts.map(a => a.account_number));

      // Get transactions
      const response = await axios.get('/api/transactions', { withCredentials: true });
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const isOutgoing = (transaction) => {
    return userAccounts.includes(transaction.from_account);
  };

  if (loading) {
    return <Layout><div style={{ padding: '40px' }}>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">📜 Transaction History</h1>

        <div className="glass-card">
          {transactions.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>📭 No transactions yet</p>
              <p>Your transactions will appear here</p>
            </div>
          ) : (
            <div className="transaction-list">
              {transactions.map((transaction) => {
                const isOut = isOutgoing(transaction);
                return (
                  <div
                    key={transaction.transaction_id}
                    className="transaction-item"
                  >
                    <div className="transaction-info">
                      <div className="transaction-type">
                        {isOut ? '📤 Transfer Out' : '📥 Transfer In'}
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        marginTop: '8px',
                        fontSize: '0.85rem',
                        color: 'rgba(255, 255, 255, 0.6)'
                      }}>
                        <span>
                          {isOut ? 'To:' : 'From:'} {isOut ? transaction.to_account : transaction.from_account}
                        </span>
                        <span>
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {transaction.description && (
                        <div style={{
                          marginTop: '4px',
                          fontSize: '0.85rem',
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontStyle: 'italic'
                        }}>
                          {transaction.description}
                        </div>
                      )}
                    </div>
                    <div className={`transaction-amount ${isOut ? 'negative' : ''}`}>
                      {isOut ? '-' : '+'}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginTop: '24px'
        }}>
          <a href="/transfer" className="btn btn-primary" style={{
            textDecoration: 'none',
            textAlign: 'center',
            display: 'block'
          }}>
            💸 New Transfer
          </a>
          <a href="/" className="btn btn-primary" style={{
            textDecoration: 'none',
            textAlign: 'center',
            display: 'block'
          }}>
            📊 Dashboard
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;
