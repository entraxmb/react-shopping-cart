import React from 'react';
import Navigation from '../navigation/navigation';
import ShopContext from '../../context/shop-context';

const Header = (props) => {
  return (
    <ShopContext.Consumer>
      {(context) => (
        <>
          <div>
            <div>
              <h1>RCart</h1>
            </div>
            <div>
              <Navigation
                cartItemNumber={context.cart.reduce(
                  (count, curItem) => {
                    return count + curItem.quantity;
                  },
                  0
                )}
              />
            </div>
          </div>
        </>
      )}
    </ShopContext.Consumer>
  );
};

export default Header;
