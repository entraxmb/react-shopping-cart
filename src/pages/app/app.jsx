import React from 'react';
import Favicon from 'react-favicon';
import AllRoutes from '../router/router';
import fIco from '../../assets/images/favicon.ico';
import GlobalState from '../../context/global-state';

const App = (props) => {
  return (
    <GlobalState>
      <div className="container">
        <Favicon url={fIco} />
        <AllRoutes />
      </div>
    </GlobalState>
  );
};

export default App;
