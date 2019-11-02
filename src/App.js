import React from 'react';

import './App.css'
import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';

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
