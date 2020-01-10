import './semantic/dist/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App isMobile={false} />
    </Router>
  </Provider>,
  document.getElementById('quizdini')
);

// console.log('STRIKE KEY', process.env.REACT_APP_STRIPE_KEY);
