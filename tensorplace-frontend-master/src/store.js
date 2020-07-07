import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import rootReducer from './reducers';

export function configureStore(initialState = {}) {
  const composeEnhancers =
   typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const promiseErrorHandler = (store) => (next) => (action) => new Promise((resolve) => resolve(next(action))).catch((error) => {
    // Without this any uncaught exceptions and their stack traces will be
    // hidden, so don't delete it!
    console.error(error); // eslint-disable-line no-console
    // return store.dispatch(errorAction());
    // toDo comment temporarily until is fixed
    return store;
  });

  const enhancers = composeEnhancers(
    applyMiddleware(promiseErrorHandler),
    applyMiddleware(thunk),
    applyMiddleware(multi),
    // applyMiddleware(logger)
  );

  const store = createStore(rootReducer, initialState, enhancers);

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
