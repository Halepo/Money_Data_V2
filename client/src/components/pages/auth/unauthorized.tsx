import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div>
      <h1>Unauthorized</h1>
      <Link to="/home">Go back home</Link>
    </div>
  );
}
