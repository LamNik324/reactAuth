import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const preloadedState = window.localStorage.getItem("state") || '{"isAuthenticated": false}';

const store = createStore(
  (state, { type }) => {
    switch (type) {
      case "AUTHENTICATED_SUCCESSFULLY":
        return {
          isAuthenticated: true,
        };

      default:
        return state;
    }
  },
  JSON.parse(preloadedState),
  composeWithDevTools()
);

store.subscribe(() => {
  const state = store.getState();
  window.localStorage.setItem("state", JSON.stringify(state));
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
