import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardFooter, Row, Col } from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ajuda2 from "../../../assets/img/ajuda2.png";

class AjudaRobo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Row>
        <Col xs="12" lg="12" sm="12">
          <Card>
            <CardHeader color="#FFFFFF">
              <h5 className="title">Passo 1: Acionando e desligando o Bot</h5>
            </CardHeader>
            <CardBody>
              <p>
                Alternando essa opção você pode a qualquer momento acionar o
                robô para trabalhar ou sismplemenste desativá-lo
              </p>
              <img
                src={ajuda2}
                width="300px"
                height="350px"
                style={{ display: "block", margin: "10px auto" }}
              />
              <CardHeader color="#FFFFFF">
                <h5 className="title">Passo 2: Acionando venda e compra</h5>
              </CardHeader>
              <p>
                Nessa tela é possivel observar que podemos acionar a venda, com
                isso o robô estará trabalhando para vender ativos, marcando a
                opção a opção para acionar compra o robô estará também comprando
                ativos para com isso vender em uma melhor oportunidade, as duas
                opções já são habilitadas por padrão quando iniciamos o bot.
              </p>
            </CardBody>
            <CardFooter />
          </Card>
        </Col>
      </Row>
    );
  }
}

AjudaRobo = reduxForm({ form: "deleteAccountForm" })(AjudaRobo);
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(AjudaRobo);
