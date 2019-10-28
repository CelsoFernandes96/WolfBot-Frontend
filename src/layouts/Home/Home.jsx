import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "../../routes";

import AuthNavbar from "../../components/Navbars/AuthNavbar";

class Pages extends React.Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }

      if (prop.layout === "/home") {
        console.log(prop.layout + prop.path);
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

  componentDidMount() {
    document.documentElement.classList.remove("nav-open");
  }
  render() {
    return (
      <>
        <AuthNavbar brandText={this.getActiveRoute(routes) + ""} />
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className={"full-page " + "home"}>
            <Switch>{this.getRoutes(routes)}</Switch>
          </div>
        </div>
      </>
    );
  }
}

export default Pages;
