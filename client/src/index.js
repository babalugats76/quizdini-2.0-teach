import './semantic/dist/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import reducers from './reducers';
import { ScrollToTop } from './components/UI/';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <App isMobile={false} />
    </Router>
  </Provider>,
  document.getElementById('quizdini')
);
