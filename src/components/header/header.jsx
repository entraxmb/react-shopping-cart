import React from 'react';
import Navigation from '../navigation/navigation';
import ShopContext from '../../context/shop-context';

import './header.css';

const Header = (props) => {
  return (
    <ShopContext.Consumer>
      {(context) => (
        <>
          <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a
              href="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
            >
              <span className="fs-4">RCart</span>
            </a>
            <Navigation
              cartItemNumber={context.cart.reduce(
                (count, curItem) => {
                  return count + curItem.quantity;
                },
                0
              )}
            />
          </header>
        </>
      )}
    </ShopContext.Consumer>
  );
};

export default Header;
