import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from 'components/Header';
import Stories from 'components/Stories';
import Item from 'components/Item';

import store from './store';

import './app-global-styles.scss';

const App = () => (
  <Router>
    <Provider store={store}>
      <div className="app-container">
        <Header />
        <Switch>
          <Route path="/item/:id" component={Item} />
          <Route path="/:type" component={Stories} />
          <Redirect exact to="/top" from="/" />
        </Switch>
      </div>
    </Provider>
  </Router>
);

render(<App />, document.getElementById('root'));
