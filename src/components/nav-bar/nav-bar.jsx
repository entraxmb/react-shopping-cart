import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" title="">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/cart" title="">
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;