import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header';

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // populate the poducts
  const products = [
    {
      id: 1,
      name: 'Bread',
      type: 'Baked',
      price: 1.1,
    },
    {
      id: 2,
      name: 'Milk',
      type: 'Dairy',
      price: 0.5,
    },
    {
      id: 3,
      name: 'Cheese',
      type: 'Dairy',
      price: 0.9,
    },
    {
      id: 4,
      name: 'Soup',
      type: 'Grocery',
      price: 0.6,
    },
    {
      id: 5,
      name: 'Butter',
      type: 'Dairy',
      price: 1.2,
    },
  ];

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  const listProducts = products.map((item) => (
    /*<div key={el.id}>
      {`${el.name}: £${el.price.toFixed(2)}`}
      <input
        type="submit"
        value="add"
        onClick={() => addToCart(el)}
      />
    </div>*/
    <tr data-testid="tblProductItem" key={item.id}>
      <td>
        <h3>{item.name}</h3>
      </td>
      <td>
        <span>Price: {item.price.toFixed(2)}</span>
      </td>
      <td>
        <button
          data-testid="addToCart"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>
      </td>
    </tr>
  ));

  const cartItems = cart.map((item) => (
    /*<div key={el.id}>
      {`${el.name}: £${el.price.toFixed(2)}`}
      <input
        type="submit"
        value="remove"
        onClick={() => removeFromCart(el)}
      />
    </div>*/
    <tr data-testid="tblCartItem" key={item.id}>
      <td>
        <h3>{item.name}</h3>
      </td>
      <td>
        <span>Price: {item.price.toFixed(2)}</span>
      </td>
      <td>
        <button
          data-testid="removeFromCart"
          onClick={() => removeFromCart(item)}
        >
          Remove from Cart
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <Header />
      <div>
        <h1>Shop</h1>
      </div>
      <div>
        <table id="tblProducts" data-testid="tblProducts">
          <tbody>{listProducts}</tbody>
        </table>
      </div>
      <div>CART</div>
      <div>
        <table id="tblCart" data-testid="tblCart">
          <tbody>{cartItems}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Shop;
