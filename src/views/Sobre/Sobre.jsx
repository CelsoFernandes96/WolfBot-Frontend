import React from "react";
import { reduxForm, Field } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NotificationAlert from "react-notification-alert";

import { entrarEmContato } from "../Home/homeActions";
import { entrarEmContatoRequest } from "../Home/homeRequests";
import bgImagem from "../../assets/img/bg-login.jpg";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

class Sobre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async onSubmit(values) {
    const { entrarEmContato } = this.props;
    const signupResult = await entrarEmContatoRequest(values);
    if (!signupResult.data.success) {
      signupResult.data.errors.forEach(erro => {
        const options = {
          place: "tr",
          message: erro.message,
          type: "danger",
          icon: "tim-icons icon bell-55",
          autoDismiss: 5
        };
        this.refs.notificationAlert.notificationAlert(options);
      });
    } else {
      entrarEmContato(values);
      this.props.history.replace("/auth/emailsendactiveaccount");
    }
  }

  componentDidMount() {
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <>
        <div
          className="content"
          style={{ backgroundImage: "url(" + bgImagem + ")" }}
        >
          <div className="rna-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Container>
            <Row>
              <Col className="ml-auto" md="5">
                <div className="info-area info-horizontal mt-5">
                  {/* <div className="icon icon-warning">
                    <i className="tim-icons icon-settings-gear-63" />
                  </div> */}
                  <div className="description">
                    <h3 className="info-title">SOBRE</h3>
                    <p className="description">
                      Wolfbot é uma plataforma online que automatiza suas
                      operações de compra e venda de criptomoedas nas duas
                      principais exchanges de existem no mercado, a Bittrex e a
                      Bitfinex, dando total autonomia para que o usuário realize
                      a sua configuração e definindo a sua melhor estratégia
                      para operar, o Wolfbot trabalha 100% na núvem operando 24
                      horas por dia para aproveitar todas as situações que
                      favorecam o trade.
                    </p>
                  </div>
                </div>{" "}
                <div className="info-area info-horizontal" />
              </Col>
              <form
                onSubmit={handleSubmit(values => this.onSubmit(values))}
                className="form"
              >
                <Col className="mr-auto" md="9">
                  <Card
                    className="card-default"
                    style={{ backgroundColor: "#131313" }}
                  >
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("../../assets/img/card-info.png")}
                      />
                      <CardTitle tag="h1" style={{ fontSize: "28px" }}>
                        Entrar em Contato
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <InputGroup>
                        <p>
                          Envie um email para: <b>wolfbotbr@gmail.com</b>
                        </p>
                      </InputGroup>
                    </CardBody>
                    <CardFooter />
                  </Card>
                </Col>
              </form>
            </Row>
            <Row>
              <Col className="ml-auto" md="5">
                <div className="info-area info-horizontal mt-5">
                  {/* <div className="icon icon-warning">
                    <i className="tim-icons icon-settings-gear-63" />
                  </div> */}
                  <div className="description">
                    {/* <h3 className="info-title">WOLFBOT</h3> */}
                  </div>
                </div>{" "}
                <div className="info-area info-horizontal" />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

Sobre = reduxForm({ form: "sobreForm" })(Sobre);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ entrarEmContato }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(Sobre);
