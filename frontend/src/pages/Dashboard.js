import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Sparkline from '../components/Sparkline';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userRes = await axios.get('/api/me', { withCredentials: true });
      setUser(userRes.data.user);

      const accountsRes = await axios.get('/api/accounts', { withCredentials: true });
      setAccounts(accountsRes.data.accounts);

      const total = accountsRes.data.accounts.reduce((sum, acc) => sum + acc.balance, 0);
      setTotalBalance(total);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Layout><div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="page">
        <div style={{ marginBottom: '20px' }}>
          <h1 className="page-title">👋 Welcome, {user?.name || 'User'}</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Manage your accounts and track your finances
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="dashboard-grid" style={{ marginBottom: '40px' }}>
          <div className="stat-card glass-card">
            <div className="stat-label">Total Balance</div>
            <div className="stat-value">${totalBalance.toFixed(2)}</div>
            <div style={{ marginTop: '16px', opacity: 0.7 }}>
              <Sparkline data={[300, 450, 380, 520, 600, 650, 700, 750, 800, 850]} />
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-label">Total Accounts</div>
            <div className="stat-value">{accounts.length}</div>
            <div style={{
              marginTop: '12px',
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              Active accounts
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-label">Account Status</div>
            <div style={{
              marginTop: '8px',
              fontSize: '1.5rem',
              color: '#00ff9d'
            }}>
              ✓ Active
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              All systems operational
            </div>
          </div>
        </div>

        {/* Accounts Section */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '20px',
            color: '#ffffff'
          }}>
            📊 Your Accounts
          </h2>

          <div className="dashboard-grid">
            {accounts.map((account) => (
              <div key={account.account_id} className="account-card glass-card">
                <div className="account-name">{account.account_name}</div>
                <div className="account-number">{account.account_number}</div>
                <div style={{ marginBottom: '16px' }}>
                  <Sparkline data={[100, 200, 150, 250, 300, 280, 350, 380, 400, 420]} />
                </div>
                <div className="account-balance">${account.balance.toFixed(2)}</div>
                <div style={{
                  marginTop: '12px',
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  {account.account_type} Account
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '20px',
            color: '#ffffff'
          }}>
            ⚡ Quick Actions
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px'
          }}>
            <a href="/transfer" className="btn btn-primary" style={{
              padding: '16px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'block'
            }}>
              💸 Transfer
            </a>
            <a href="/add-account" className="btn btn-primary" style={{
              padding: '16px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'block'
            }}>
              ➕ Add Account
            </a>
            <a href="/transactions" className="btn btn-primary" style={{
              padding: '16px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'block'
            }}>
              📜 Transactions
            </a>
            <a href="/balance" className="btn btn-primary" style={{
              padding: '16px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'block'
            }}>
              💰 Check Balance
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
