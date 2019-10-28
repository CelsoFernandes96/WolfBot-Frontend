import React, { Component } from "react";

// reactstrap components
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import Configurando from "./screens/Configurando";
import AjudaRobo from "./screens/AjudaRobo";

class Ajuda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horizontalTabs: "1"
    };
  }

  changeActiveTab = (e, tabState, tadName) => {
    e.preventDefault();
    this.setState({
      [tabState]: tadName
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="10">
              <Nav className="nav-pills-info" pills>
                <NavItem>
                  <NavLink
                    data-toggle="tab"
                    href="#"
                    className={
                      this.state.horizontalTabs === "1" ? "active" : ""
                    }
                    onClick={e =>
                      this.changeActiveTab(e, "horizontalTabs", "1")
                    }
                  >
                    Configurando com a exchange e definindo a estratégia
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    data-toggle="tab"
                    href="#"
                    className={
                      this.state.horizontalTabs === "2" ? "active" : ""
                    }
                    onClick={e =>
                      this.changeActiveTab(e, "horizontalTabs", "2")
                    }
                  >
                    Iniciando o robô
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    data-toggle="tab"
                    href="#"
                    className={
                      this.state.horizontalTabs === "3" ? "active" : ""
                    }
                    onClick={e =>
                      this.changeActiveTab(e, "horizontalTabs", "3")
                    }
                  >
                    Ajuda 3
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    data-toggle="tab"
                    href="#"
                    className={
                      this.state.horizontalTabs === "4" ? "active" : ""
                    }
                    onClick={e =>
                      this.changeActiveTab(e, "horizontalTabs", "4")
                    }
                  >
                    Ajuda 4
                  </NavLink>
                </NavItem> */}
              </Nav>
              <TabContent
                className="tab-space"
                activeTab={this.state.horizontalTabs}
              >
                <TabPane tabId="1">
                  <Configurando />
                </TabPane>
                <TabPane tabId="2">
                  <AjudaRobo />
                </TabPane>
                <TabPane tabId="3" />
                <TabPane tabId="4" />
              </TabContent>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Ajuda;
