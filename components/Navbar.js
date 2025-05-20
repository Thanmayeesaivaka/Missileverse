import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4">
      <Link to="/" className="navbar-brand">Missileverse</Link>
      <div className="ml-auto">
        <Link to="/login" className="btn btn-outline-light mx-2">Login</Link>
        <Link to="/register" className="btn btn-light">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
