import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container">
      {' '}
      <h1>404 NotFound</h1>
      <Link to="/home">Go Back Home</Link>
    </div>
  );
}
