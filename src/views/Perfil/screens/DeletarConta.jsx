import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import Input from "../../../components/Input/Input";
import NotificationAlert from "react-notification-alert";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteAccountRequest } from "../PerfilRequests";
import { deleteAccount } from "../PerfilActions";
import { Redirect } from "react-router-dom";

class DeletarConta extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async onSubmit(values) {
    const { deleteAccount } = this.props;
    const deleteResult = await deleteAccountRequest(values);
    if (!deleteResult.data.success) {
      deleteResult.data.errors.forEach(erro => {
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
      deleteAccount(deleteResult.data);
      window.location.href = "http://localhost:3000/auth/deletedaccount";
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Row>
        <Col xs="9" lg="9" sm="9">
          <Card>
            <form
              onSubmit={handleSubmit(values => this.onSubmit(values))}
              className="form"
            >
              <div className="rna-container">
                <NotificationAlert ref="notificationAlert" />
              </div>
              <CardHeader>
                <h5 className="title">Deletar a minha conta</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <label>
                        Informe a sua senha antes de deletar a sua conta
                      </label>
                      <Field
                        component={Input}
                        placeholder="Senha Atual"
                        type="password"
                        name="password"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="success" type="submit">
                  Excluir a minha conta agora!
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Col>
        <Col xs="3" lg="3" sm="3">
          <Card>
            <CardHeader color="#FFFFFF">
              <h5 className="title">Atenção!</h5>
            </CardHeader>
            <CardBody>
              <p className="card-category">
                Após a confirmação da exclusão, todos os seus dados na
                plataforma serão excluídos permanentemente, inclúindo as
                credenciais da exchange que foi configurada na página de
                configuração, os robôs que estiverem em execução automáticamente
                serão interrompidos e você será redirecionado para fora da
                plataforma.
              </p>
            </CardBody>
            <CardFooter />
          </Card>
        </Col>
      </Row>
    );
  }
}

DeletarConta = reduxForm({ form: "deleteAccountForm" })(DeletarConta);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteAccount }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(DeletarConta);
