import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/saved-candidates" className="navbar-item">
          Saved Candidates
        </Link>
      </div>
    </nav>
  );
};

export default Nav;