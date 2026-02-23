import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        🏦 KodBank
      </div>

      <nav>
        <ul className="nav-menu">
          <li className="nav-item">
            <a 
              href="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              📊 Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="/balance" 
              className={`nav-link ${isActive('/balance') ? 'active' : ''}`}
            >
              💰 Balance
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="/add-account" 
              className={`nav-link ${isActive('/add-account') ? 'active' : ''}`}
            >
              ➕ Add Account
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="/transfer" 
              className={`nav-link ${isActive('/transfer') ? 'active' : ''}`}
            >
              💸 Transfer
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="/transactions" 
              className={`nav-link ${isActive('/transactions') ? 'active' : ''}`}
            >
              📜 Transactions
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="/account-details" 
              className={`nav-link ${isActive('/account-details') ? 'active' : ''}`}
            >
              ℹ️ Account Details
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-divider"></div>

      <button className="btn btn-danger logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </aside>
  );
};

export default Sidebar;
