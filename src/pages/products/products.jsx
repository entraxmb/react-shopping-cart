import React from 'react';
import Header from '../../components/header/header';
import ShopContext from '../../context/shop-context';
// import './Products.css';

const ProductsPage = (props) => {
  return (
    <ShopContext.Consumer>
      {(context) => (
        <React.Fragment>
          <Header
            cartItemNumber={context.cart.reduce((count, curItem) => {
              return count + curItem.quantity;
            }, 0)}
          />
          <main className="products">
            <ul>
              {context.products.map((product) => (
                <li key={product.id}>
                  <div>
                    <strong>{product.name}</strong> - £
                    {product.price.toFixed(2)}
                  </div>
                  <div>
                    <button
                      onClick={context.addProductToCart.bind(
                        this,
                        product
                      )}
                    >
                      Add to Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </React.Fragment>
      )}
    </ShopContext.Consumer>
  );
};

export default ProductsPage;
