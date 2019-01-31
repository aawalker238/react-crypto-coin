import React from 'react';
import { Link } from 'react-router-dom';
import './404.css';

const NotFound = () => {
  return (
    <div className="NotFound">
      <h1 className="NotFound-title">404 | Page not found.</h1>
      <Link to="/" className="NotFound-link">
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;
