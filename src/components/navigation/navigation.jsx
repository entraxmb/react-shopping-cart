import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <>
      <nav>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to="/" title="" className="nav-link">
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" title="" className="nav-link">
              Cart ({props.cartItemNumber})
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
