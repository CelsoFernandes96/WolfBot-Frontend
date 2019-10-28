import React from "react";
import { Route, Switch } from "react-router-dom";

import AuthNavbar from "../../components/Navbars/AuthNavbar";
import Footer from "../../components/Footer/Footer";

import routes from "../../routes";

class Pages extends React.Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    this.props.history.replace("/auth/page404");
    return "Page404";
  };
  getFullPageName = routes => {
    let pageName = this.getActiveRoute(routes);
    switch (pageName) {
      case "Sobre":
        return "sobre-page";
      case "Login":
        return "login-page";
      case "Register":
        return "register-page";
      case "EmailSendActiveAccount":
        return "email-send-active-account-page";
      case "Page404":
        return "404-page";
      default:
        return "Default Brand Text";
    }
  };
  componentDidMount() {
    document.documentElement.classList.remove("nav-open");
  }
  render() {
    return (
      <>
        <AuthNavbar brandText={this.getActiveRoute(routes) + ""} />
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className={"full-page " + this.getFullPageName(routes)}>
            <Switch>{this.getRoutes(routes)}</Switch>
            <Footer fluid />
          </div>
        </div>
      </>
    );
  }
}

export default Pages;
