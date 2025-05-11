import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Ensure proper usage of Link */}
      <Link to="/login">Go to Login</Link>
      {/* ...existing code... */}
    </div>
  );
}

export default App;