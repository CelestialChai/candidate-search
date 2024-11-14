import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404: Page Not Found</h1>
      <p>¯\_(ツ)_/¯</p>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="button is-link" style={{ marginTop: '1rem' }}>
        Go Back to Home
      </Link>
    </section>
  );
};

export default ErrorPage;