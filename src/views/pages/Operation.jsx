import React from "react";
import NotificationAlert from "react-notification-alert";
import bgImagem from "../../assets/img/bg-login.jpg";
import { Link } from "react-router-dom";
import * as qs from "query-string";
import Loading from "../../components/Loading/Loading";
import Page404 from "./Page404.jsx";
import { reduxForm, Field } from "redux-form";
import Input from "../../components/Input/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { verifyActiveAccount, changePassword } from "./authActions";
import { changePasswordLogin } from "./AuthRequests";

import logo from "../../assets/img/wolfbot-logo.png";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardFooter,
  CardTitle,
  Container,
  Col,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.code = qs.parse(this.props.location.search).oobCode;
  }

  componentDidMount() {
    document.body.classList.toggle("account-active-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("account-active-page");
  }
  componentWillMount() {
    this.props.verifyActiveAccount(this.code);
  }

  async onSubmit(values) {
    const { changePassword } = this.props;
    const result = await changePasswordLogin({
      ...values,
      code: this.props.code
    });
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
      changePassword();
      this.props.history.replace("/auth/passwordchanged");
    }
  }

  render() {
    const { handleSubmit } = this.props;
    if (
      (this.props.accountActive || this.props.changePassword) &&
      (!this.props.codeActiveAccountInvalid || !this.props.accountActive)
    )
      console.log(this.props);
    if (this.props.operation === "EMAIL_ACTIVATION")
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
                    <Card
                      className="card-default card p-4"
                      style={{ backgroundColor: "#131313" }}
                    >
                      <CardBody>
                        <img
                          src="https://raw.githubusercontent.com/wolfbot-br/wolfbot-frontend/master/public/dist/img/account/done.png"
                          width="125px"
                          height="125px"
                          style={{ display: "block", margin: "10px auto" }}
                        />
                        <CardTitle style={{ textAlign: "center" }} tag="h2">
                          Sua conta foi ativada!
                        </CardTitle>
                        <CardTitle style={{ textAlign: "center" }} tag="h4">
                          Acesse sua conta com seu email e senha.
                        </CardTitle>
                      </CardBody>
                      <CardFooter className="pageCardFooter p-4">
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
                        <CardTitle style={{ textAlign: "center" }} tag="h3">
                          Wolfbot
                        </CardTitle>
                      </CardFooter>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      );
    if (this.props.operation === "PASSWORD_RESET")
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
                <Col md="6">
                  <form
                    className="form"
                    onSubmit={handleSubmit(value => this.onSubmit(value))}
                  >
                    <CardGroup>
                      <Card
                        className="card-default card p-4"
                        style={{ backgroundColor: "#131313" }}
                      >
                        <CardBody>
                          <CardTitle style={{ textAlign: "center" }} tag="h2">
                            Defina a sua nova Senha
                          </CardTitle>
                          <CardTitle style={{ textAlign: "center" }} tag="h4" />
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Field
                              component={Input}
                              placeholder="Senha"
                              type="password"
                              name="password"
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
                              placeholder="Confirme a senha"
                              type="password"
                              name="passwordConfirm"
                            />
                          </InputGroup>
                        </CardBody>
                        <CardFooter className="pageCardFooter p-4">
                          <Row className="justify-content-center">
                            <Button
                              className="btn-round"
                              color="info"
                              type="submit"
                              onClick={handleSubmit(value =>
                                this.onSubmit(value)
                              )}
                              size="lg"
                            >
                              Alterar senha!
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
                    </CardGroup>
                  </form>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      );
    else if (this.props.codeActiveAccountInvalid || this.props.emailIsActive) {
      return <Page404 />;
    } else {
      return <Loading />;
    }
  }
}

Operation = reduxForm({ form: "operationForm" })(Operation);
const mapStateToProps = state => ({
  accountActive: state.auth.accountActive,
  emailIsActive: state.auth.emailIsActive,
  codeActiveAccountInvalid: state.auth.codeActiveAccountInvalid,
  operation: state.auth.operation,
  changePassword: state.auth.operation,
  code: state.auth.code
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ verifyActiveAccount, changePassword }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Operation);
