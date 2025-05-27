import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Access.css';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="access-denied-container">
      <div className="lock-icon">🔒</div>
      <h1 className="access-title">Access Denied</h1>
      <p className="access-subtitle">
        You do not have permission to view this page.<br />
        Please <span className="highlight">sign in</span> or contact the admin for access.
      </p>
      <button className="access-btn" onClick={() => navigate('/login')}>
        Go to Login
      </button>
    </div>
  );
};

export default AccessDenied;
