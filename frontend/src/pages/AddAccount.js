import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const AddAccount = () => {
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('Savings');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddAccount = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(
        '/api/accounts',
        {
          account_name: accountName,
          account_type: accountType
        },
        { withCredentials: true }
      );

      setMessage(`✓ Account "${accountName}" created successfully!`);
      setAccountName('');
      setAccountType('Savings');

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">➕ Create New Account</h1>

        <div style={{ maxWidth: '500px' }}>
          <div className="glass-card">
            {error && (
              <div className="alert alert-error" style={{ marginBottom: '20px' }}>
                {error}
              </div>
            )}

            {message && (
              <div className="alert alert-success" style={{ marginBottom: '20px' }}>
                {message}
              </div>
            )}

            <form onSubmit={handleAddAccount}>
              <div className="form-group">
                <label className="form-label">Account Name</label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="e.g., Savings for Vacation"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Type</label>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  required
                >
                  <option value="Savings">Savings Account</option>
                  <option value="Checking">Checking Account</option>
                  <option value="Money Market">Money Market Account</option>
                  <option value="Investment">Investment Account</option>
                  <option value="Business">Business Account</option>
                </select>
              </div>

              <div className="glass-card" style={{
                background: 'rgba(0, 245, 255, 0.1)',
                border: '1px solid rgba(0, 245, 255, 0.3)',
                marginBottom: '20px',
                padding: '16px'
              }}>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  💡 <strong>New Account Details:</strong>
                  <br/>✓ Starting balance: $1,000
                  <br/>✓ Account number will be auto-generated
                  <br/>✓ Instant account activation
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? '⏳ Creating...' : '✓ Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddAccount;
