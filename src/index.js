import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header/Header';
import List from './components/List/List';
import NotFound from './components/404/404';
import CoinDetail from './components/CoinDetail/CoinDetail';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" component={List} exact />
          <Route path="/currency/:id" component={CoinDetail} exact />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
