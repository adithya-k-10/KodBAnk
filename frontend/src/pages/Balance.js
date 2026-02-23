import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Balance = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('/api/accounts', { withCredentials: true });
      setAccounts(response.data.accounts);
      if (response.data.accounts.length > 0) {
        setSelectedAccount(response.data.accounts[0].account_number);
        fetchBalance(response.data.accounts[0].account_number);
      }
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchBalance = async (accountNumber) => {
    try {
      const response = await axios.get(`/api/accounts/${accountNumber}`, { withCredentials: true });
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const response = await axios.get('/api/accounts', { withCredentials: true });
        setAccounts(response.data.accounts);
        if (response.data.accounts.length > 0) {
          setSelectedAccount(response.data.accounts[0].account_number);
          await fetchBalance(response.data.accounts[0].account_number);
        }
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      } finally {
      setLoading(false);
    }
  };

  const fetchBalance = async (accountNumber) => {
    try {
      const response = await axios.get(
        `/api/balance/${accountNumber}`,
        { withCredentials: true }
      );
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const handleAccountChange = (e) => {
    const accountNumber = e.target.value;
    setSelectedAccount(accountNumber);
    fetchBalance(accountNumber);
  };

  if (loading) {
    return <Layout><div style={{ padding: '40px' }}>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">💰 Account Balance</h1>

        <div style={{ maxWidth: '600px' }}>
          <div className="glass-card">
            <div className="form-group">
              <label className="form-label">Select Account</label>
              <select
                value={selectedAccount}
                onChange={handleAccountChange}
              >
                {accounts.map((account) => (
                  <option key={account.account_id} value={account.account_number}>
                    {account.account_name} - {account.account_number}
                  </option>
                ))}
              </select>
            </div>

            <div className="glass-card" style={{
              background: 'rgba(0, 255, 157, 0.15)',
              border: '2px solid rgba(0, 255, 157, 0.5)',
              padding: '40px',
              textAlign: 'center',
              marginTop: '20px'
            }}>
              <p style={{
                fontSize: '0.95rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '16px'
              }}>
                Current Balance
              </p>
              <p style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                color: '#00ff9d',
                textShadow: '0 0 20px rgba(0, 255, 157, 0.5)'
              }}>
                ${balance !== null ? balance.toFixed(2) : '0.00'}
              </p>
            </div>

            {selectedAccount && (
              <div style={{ marginTop: '24px' }}>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
                  <strong>Account Number:</strong>
                </p>
                <p style={{
                  fontFamily: 'monospace',
                  color: '#00f5ff',
                  fontSize: '1.1rem',
                  letterSpacing: '1px'
                }}>
                  {selectedAccount}
                </p>
              </div>
            )}

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
                💸 Transfer
              </a>
              <a href="/transactions" className="btn btn-primary" style={{
                textDecoration: 'none',
                textAlign: 'center',
                display: 'block'
              }}>
                📜 Transactions
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Balance;
