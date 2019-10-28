import React from "react";
import { reduxForm, Field } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NotificationAlert from "react-notification-alert";

import { signup } from "./authActions";
import { signupRequest } from "./AuthRequests";
import bgImagem from "../../assets/img/bg-login.jpg";
import Input from "../../components/Input/Input";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async onSubmit(values) {
    const { signup } = this.props;
    const signupResult = await signupRequest(values);
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
      const options = {
        place: "tc",
        message: "Cadastro realizado com sucesso! Carregando...",
        type: "success",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 5,
        closeButton: false
      };
      this.refs.notificationAlert.notificationAlert(options);
      signup(values);
      setTimeout(() => {
        this.props.history.replace("/auth/emailsendactiveaccount");
      }, 2000);
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
                  <div className="icon icon-warning">
                    <i className="tim-icons icon-settings-gear-63" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Estratégia</h3>
                    <p className="description">
                      Escolha a melhor estratégia para você e tenha resultados.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-triangle-right-17" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Backtest</h3>
                    <p className="description">
                      Teste sua estratégia e analise se sua estratégia teria
                      dado certo ou não.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-info">
                    <i className="tim-icons icon-money-coins" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Compra e Venda</h3>
                    <p className="description">
                      Realize operações manuais dentro da plataforma.
                    </p>
                  </div>
                </div>
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
                        WOLFBOT
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={Input}
                          placeholder="Nome"
                          type="text"
                          name="name"
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={Input}
                          placeholder="Email"
                          type="email"
                          name="email"
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={Input}
                          type="password"
                          name="password"
                          placeholder="Senha"
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={Input}
                          type="password"
                          name="passwordConfirm"
                          placeholder="Senha de Confirmação"
                        />
                      </InputGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="info"
                        type="submit"
                        onClick={handleSubmit(value => this.onSubmit(value))}
                        size="lg"
                      >
                        Criar Conta
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </form>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

Register = reduxForm({ form: "registerForm" })(Register);
const mapDispatchToProps = dispatch => bindActionCreators({ signup }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(Register);
