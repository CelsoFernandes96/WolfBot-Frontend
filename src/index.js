import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import { Provider } from "react-redux";
import reducers from "./reducers";
import functions from "./utils/functions";

import AuthLayout from "./layouts/Auth/Auth";
import AdminLayout from "./layouts/Admin/Admin";
import HomeLayout from "./layouts/Home/Home";
import { socketManage } from "./views/pages/AuthRequests";

import "./assets/css/nucleo-icons.css";
import "./assets/scss/black-dashboard-pro-react.scss?v=1.0.0";
import "./assets/demo/demo.css";
import "react-notification-alert/dist/animate.css";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(promise, thunk)(createStore)(reducers, devTools);
const hist = createBrowserHistory();

const manageRoute = props => {
  const userLocalStorage = functions.loadLocalStorage("user_bot");
  const { path } = props.match;

  if (path === "/home") {
    return <HomeLayout {...props} />;
  }

  if (path === "/auth") {
    functions.removeLocalStorageItem("user_bot");
    return <AuthLayout {...props} />;
  }

  if (!userLocalStorage) {
    return <Redirect from={props.location.pathname} to="/auth/login" />;
  } else {
    const {
      authenticatedUser: { accessToken }
    } = userLocalStorage;
    props.token = accessToken;
    return <AdminLayout {...props} />;
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/auth" render={props => manageRoute(props)} />
        <Route path="/admin" render={props => manageRoute(props)} />
        <Route path="/home" render={props => manageRoute(props)} />
        <Redirect from="/" to="/home/index" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
