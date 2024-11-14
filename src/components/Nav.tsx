import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Candidate Finder
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Search Candidates
          </Link>
          <Link to="/saved-candidates" className="navbar-item">
            Saved Candidates
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
