import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Transfer = () => {
  const [accounts, setAccounts] = useState([]);
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('/api/accounts', { withCredentials: true });
      setAccounts(response.data.accounts);
      if (response.data.accounts.length > 0) {
        setFromAccount(response.data.accounts[0].account_number);
      }
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!fromAccount || !toAccount || !amount) {
      setError('Please fill in all required fields');
      return;
    }

    if (fromAccount === toAccount) {
      setError('Cannot transfer to the same account');
      return;
    }

    if (parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(
        '/api/transfer',
        {
          from_account: fromAccount,
          to_account: toAccount,
          amount: parseFloat(amount),
          description: description || 'Transfer'
        },
        { withCredentials: true }
      );

      setMessage(`✓ Transfer of $${amount} completed successfully!`);
      setFromAccount(fromAccount);
      setToAccount('');
      setAmount('');
      setDescription('');

      setTimeout(() => {
        window.location.href = '/transactions';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Layout><div style={{ padding: '40px' }}>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">💸 Money Transfer</h1>

        <div style={{ maxWidth: '600px' }}>
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

            <form onSubmit={handleTransfer}>
              <div className="form-group">
                <label className="form-label">From Account</label>
                <select
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  required
                >
                  <option value="">Select from account...</option>
                  {accounts.map((account) => (
                    <option key={account.account_id} value={account.account_number}>
                      {account.account_name} (${account.balance.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">To Account (Recipient Account Number)</label>
                <input
                  type="text"
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value.toUpperCase())}
                  placeholder="KB123456789ABC..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Amount ($)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Rent payment"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={submitting}
              >
                {submitting ? '⏳ Processing...' : '✓ Send Money'}
              </button>
            </form>

            <div className="glass-card" style={{
              background: 'rgba(0, 245, 255, 0.1)',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              marginTop: '20px',
              padding: '16px'
            }}>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.8)' }}>
                <strong>💡 Transfer Tips:</strong>
                <br/>✓ Make sure the recipient account number is correct
                <br/>✓ Transfers are instant
                <br/>✓ You cannot transfer to your own account
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transfer;
