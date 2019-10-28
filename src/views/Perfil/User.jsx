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

import NotificationAlert from "react-notification-alert";

import FormDadosPessoais from "./screens/DadosPessoais";
import FormAlterarSenha from "./screens/AlterarSenha";
import FormAtividades from "./screens/Atividades";
import FormExcluirConta from "./screens/DeletarConta";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horizontalTabs: "dados_pessoais"
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
          <div className="rna-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="10">
              <Nav className="nav-pills-info" pills>
                <NavItem>
                  <NavLink
                    data-toggle="tab"
                    href="#"
                    className={
                      this.state.horizontalTabs === "dados_pessoais"
                        ? "active"
                        : ""
                    }
                    onClick={e =>
                      this.changeActiveTab(
                        e,
                        "horizontalTabs",
                        "dados_pessoais"
                      )
                    }
                  >
                    Dados Pessoais
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    data-toggle="tab"
                    href="#"
                    className={
                      this.state.horizontalTabs === "alterar_senha"
                        ? "active"
                        : ""
                    }
                    onClick={e =>
                      this.changeActiveTab(e, "horizontalTabs", "alterar_senha")
                    }
                  >
                    Alterar Senha
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    data-toggle="tab"
                    href="#"
                    className={
                      this.state.horizontalTabs === "atividades" ? "active" : ""
                    }
                    onClick={e =>
                      this.changeActiveTab(e, "horizontalTabs", "atividades")
                    }
                  >
                    Atividades
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    data-toggle="tab"
                    href="#"
                    className={
                      this.state.horizontalTabs === "deletar_conta"
                        ? "active"
                        : ""
                    }
                    onClick={e =>
                      this.changeActiveTab(e, "horizontalTabs", "deletar_conta")
                    }
                  >
                    Deletar a conta
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent
                className="tab-space"
                activeTab={this.state.horizontalTabs}
              >
                <TabPane tabId="dados_pessoais">
                  <FormDadosPessoais />
                </TabPane>
                <TabPane tabId="alterar_senha">
                  <FormAlterarSenha />
                </TabPane>
                <TabPane tabId="atividades">
                  <FormAtividades />
                </TabPane>
                <TabPane tabId="deletar_conta">
                  <FormExcluirConta />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;
