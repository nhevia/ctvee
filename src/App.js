import React from 'react';
// import {Route, Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
// import About from './components/About/About';
// import Shows from './containers/Shows/Shows'

function App() {
  return (
    <React.Fragment>
      <Layout>
        {/* <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shows/:id" component={Shows} />
          <Route path="/about" component={About} />
        </Switch> */}
        <Home />
      </Layout>
    </React.Fragment>
  );
}

export default App;
