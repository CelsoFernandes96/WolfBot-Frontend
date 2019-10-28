import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationAlert from "react-notification-alert";
import bgImagem from "../../assets/img/bg-login.jpg";
import { Link } from "react-router-dom";
import { passwordRecovery } from "./authActions";
import Input from "../../components/Input/Input";

import logo from "../../assets/img/wolfbot-logo.png";

import { passwordRecoveryRequest } from "./AuthRequests";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardFooter,
  CardTitle,
  Container,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row
} from "reactstrap";

class PasswordRecovery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.body.classList.toggle("password-recovery-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("password-recovery-page");
  }

  // password-recovery
  async onSubmit(values) {
    const { passwordRecovery } = this.props;
    const result = await passwordRecoveryRequest(values);
    if (!result.data.success) {
      result.data.errors.forEach(erro => {
        const options = {
          place: "tr",
          message: erro.message,
          type: "danger",
          icon: "tim-icons icon-bell-55",
          autoDismiss: 3
        };
        this.refs.notificationAlert.notificationAlert(options);
      });
    } else {
      const options = {
        place: "tc",
        message: "Aguarde! Email sendo enviado.",
        type: "success",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 5,
        closeButton: false
      };
      this.refs.notificationAlert.notificationAlert(options);
      passwordRecovery(values);
      setTimeout(() => {
        this.props.history.replace("/auth/emailsendpasswordrecovery");
      }, 2000);
    }
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
          <Container className="ContainerAuth">
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <form
                    className="form"
                    onSubmit={handleSubmit(value => this.onSubmit(value))}
                  >
                    <Card
                      className="card-default card p-4"
                      style={{ backgroundColor: "#131313" }}
                    >
                      <CardBody>
                        <CardTitle style={{ textAlign: "center" }} tag="h2">
                          Digite seu Email
                        </CardTitle>
                        <CardTitle style={{ textAlign: "center" }} tag="h4">
                          E nós lhe enviaremos as instruções para redefinir sua
                          senha.
                        </CardTitle>
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
                      </CardBody>
                      <CardFooter className="pageCardFooter p-4">
                        <Row className="justify-content-center">
                          <Button
                            type="submit"
                            className="btn-round"
                            color="info"
                            onClick={handleSubmit(value =>
                              this.onSubmit(value)
                            )}
                            size="lg"
                          >
                            Recuperar Senha!
                          </Button>
                        </Row>
                        <Row className="justify-content-center">
                          <p className="pageCardText text-muted">
                            Entrar em sua conta?
                            <Link to="/auth/login">
                              <Button color="link" className="px-0">
                                Login
                              </Button>
                            </Link>
                          </p>
                        </Row>
                      </CardFooter>
                      <CardFooter className="pageCardFooter p-4">
                        <Row className="justify-content-center">
                          <img
                            src={logo}
                            width="50px"
                            height="30px"
                            style={{ display: "block", margin: "10px auto" }}
                          />
                        </Row>
                        <CardTitle
                          style={{ textAlign: "center", color: "#ffffff" }}
                        >
                          Wolfbot
                        </CardTitle>
                      </CardFooter>
                    </Card>
                  </form>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

PasswordRecovery = reduxForm({ form: "authForm" })(PasswordRecovery);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ passwordRecovery }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(PasswordRecovery);
