import React, { Component } from 'react';
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

import ConfigBacktest from './screens/ConfigBacktest';
import ResultadoTeste from './screens/ResultadoTeste';
class Backtesting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horizontalTabs: "estrategia",
      backtest: '',
    };
  }

  changeActiveTab = (e, tabState, tadName) => {
    e.preventDefault();
    this.setState({
      [tabState]: tadName
    });
  };

  getResult = (backtestResult) => {
    this.setState({ backtest: backtestResult });
  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col xs="12">
            <Nav className="nav-pills-info" pills>
              <NavItem>
                <NavLink
                  data-toggle="tab"
                  href="#"
                  className={
                    this.state.horizontalTabs === "estrategia" ? "active" : ""
                  }
                  onClick={e =>
                    this.changeActiveTab(e, "horizontalTabs", "estrategia")
                  }
                >
                  Estratégia
              </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  data-toggle="tab"
                  href="#"
                  className={
                    this.state.horizontalTabs === "resultados" ? "active" : ""
                  }
                  onClick={e =>
                    this.changeActiveTab(e, "horizontalTabs", "resultados")
                  }
                >
                  Resultados
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent
              className="tab-space"
              activeTab={this.state.horizontalTabs}
            >
              <TabPane tabId="estrategia">
                <ConfigBacktest updateResult={this.getResult.bind(this)} />
              </TabPane>
              <TabPane tabId="resultados">
                <ResultadoTeste updateResult={this.state.backtest} />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Backtesting
