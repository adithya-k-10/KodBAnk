import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const AccountDetails = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('/api/accounts', { withCredentials: true });
      setAccounts(response.data.accounts);
      if (response.data.accounts.length > 0) {
        setSelectedAccount(response.data.accounts[0]);
      }
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Layout><div style={{ padding: '40px' }}>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">ℹ️ Account Details</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '250px 1fr',
          gap: '24px'
        }}>
          {/* Account List */}
          <div className="glass-card" style={{ height: 'fit-content' }}>
            <h3 style={{ marginBottom: '16px', color: '#00f5ff' }}>Your Accounts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {accounts.map((account) => (
                <button
                  key={account.account_id}
                  onClick={() => setSelectedAccount(account)}
                  style={{
                    padding: '12px',
                    border: '1px solid',
                    borderColor: selectedAccount?.account_id === account.account_id 
                      ? '#00f5ff' 
                      : 'rgba(255, 255, 255, 0.15)',
                    background: selectedAccount?.account_id === account.account_id
                      ? 'rgba(0, 245, 255, 0.2)'
                      : 'transparent',
                    borderRadius: '8px',
                    color: '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 300ms ease',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => {
                    if (selectedAccount?.account_id !== account.account_id) {
                      e.target.style.borderColor = 'rgba(0, 245, 255, 0.5)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedAccount?.account_id !== account.account_id) {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }
                  }}
                >
                  <div style={{ fontWeight: '600' }}>{account.account_name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    ${account.balance.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Account Details */}
          {selectedAccount && (
            <div className="glass-card">
              <h2 style={{ marginBottom: '24px', color: '#00f5ff', fontSize: '1.5rem' }}>
                {selectedAccount.account_name}
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div className="glass-card" style={{
                  background: 'rgba(0, 245, 255, 0.1)',
                  border: '1px solid rgba(0, 245, 255, 0.3)'
                }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
                    Account Number
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontFamily: 'monospace',
                    color: '#00f5ff',
                    fontWeight: '600',
                    wordBreak: 'break-all'
                  }}>
                    {selectedAccount.account_number}
                  </div>
                </div>

                <div className="glass-card" style={{
                  background: 'rgba(0, 255, 157, 0.1)',
                  border: '1px solid rgba(0, 255, 157, 0.3)'
                }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
                    Current Balance
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    color: '#00ff9d',
                    fontWeight: '600'
                  }}>
                    ${selectedAccount.balance.toFixed(2)}
                  </div>
                </div>

                <div className="glass-card" style={{
                  background: 'rgba(184, 41, 221, 0.1)',
                  border: '1px solid rgba(184, 41, 221, 0.3)'
                }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
                    Account Type
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    color: '#b829dd',
                    fontWeight: '600'
                  }}>
                    {selectedAccount.account_type}
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '20px'
              }}>
                <h3 style={{ marginBottom: '16px', color: '#ffffff' }}>📋 Additional Information</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
                      Created
                    </p>
                    <p style={{ color: '#ffffff' }}>
                      {new Date(selectedAccount.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
                      Account Status
                    </p>
                    <p style={{ color: '#00ff9d', fontWeight: '600' }}>
                      ✓ Active
                    </p>
                  </div>

                  <div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
                      Account Features
                    </p>
                    <ul style={{ color: '#ffffff', marginLeft: '20px' }}>
                      <li>Instant transfers</li>
                      <li>Real-time balance updates</li>
                      <li>Transaction history</li>
                      <li>24/7 account access</li>
                    </ul>
                  </div>
                </div>
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
                  💸 Transfer
                </a>
                <a href="/balance" className="btn btn-primary" style={{
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block'
                }}>
                  💰 Check Balance
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AccountDetails;
