import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
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
                Cart ({props.cartItemNumber})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
