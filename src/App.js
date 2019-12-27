import React from 'react';

import './App.css';
import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';

function App() {
  return (
    <>
      <Layout>
        {/* <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shows/:id" component={Shows} />
          <Route path="/about" component={About} />
        </Switch> */}
        <Home />
      </Layout>
    </>
  );
}

export default App;
