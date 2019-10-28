import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardFooter, Row, Col } from "reactstrap";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ajuda1 from "../../../assets/img/ajuda1.png";
import ajuda3 from "../../../assets/img/ajuda3.png";
import ajuda4 from "../../../assets/img/ajuda4.png";

class Configurando extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col xs="12" lg="12" sm="12">
          <Card>
            <CardHeader color="#FFFFFF">
              <h5 className="title">Passo 1: Se Conectando a exchange</h5>
            </CardHeader>
            <CardBody>
              <p>
                Nesta tela é onde você se conecta a sua exchange (Bittrex ou
                Bitfinex), aqui você deve inserir as suas credenciais de conexão
                para só então avançar para a segunda parte da configuração que é
                a definição da sua estratégia.
              </p>
              <img
                src={ajuda1}
                width="800px"
                height="500px"
                style={{ display: "block", margin: "10px auto" }}
              />
              <CardHeader color="#FFFFFF">
                <h5 className="title">Passo 2: Definindo a estratégia</h5>
              </CardHeader>
              <p>
                Aqui você pode definir como quer que o bot trabalhe para você de
                acordo com seu perfil de trader, e como fazer com que sua
                estratégia seja aplicada 24 horas por dia pelo robô.
              </p>
              <img
                src={ajuda3}
                width="800px"
                height="500px"
                style={{ display: "block", margin: "10px auto" }}
              />
              <CardHeader color="#FFFFFF">
                <h5 className="title">Passo 3: Escolhendo os indicadores</h5>
              </CardHeader>
              <p>
                Nesse último passo você poderá escolher e configurar os
                indicadores que você deseja que o robô trabalhe.
              </p>
              <img
                src={ajuda4}
                width="800px"
                height="400"
                style={{ display: "block", margin: "10px auto" }}
              />
            </CardBody>
            <CardFooter />
          </Card>
        </Col>
      </Row>
    );
  }
}

Configurando = reduxForm({ form: "deleteAccountForm" })(Configurando);
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(Configurando);
