import React from 'react';
import Favicon from 'react-favicon';
import AllRoutes from '../router/router';
import fIco from '../../assets/images/favicon.ico';

const App = () => {
  return (
    <div>
      <Favicon url={fIco} />
      <AllRoutes />
    </div>
  );
};

export default App;
