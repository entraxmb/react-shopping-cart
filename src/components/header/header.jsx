import React from 'react';
import Navigation from '../nav-bar/nav-bar';

function Header() {
  return (
    <>
      <div>
        <div>
          <h1>RCart</h1>
        </div>
        <div>
          <Navigation />
        </div>
      </div>
    </>
  );
}

export default Header;
