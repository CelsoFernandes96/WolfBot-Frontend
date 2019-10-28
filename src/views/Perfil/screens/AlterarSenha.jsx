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
import NotificationAlert from "react-notification-alert";
import { reduxForm, Field } from "redux-form";
import Input from "../../../components/Input/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changePasswordProfile } from "../PerfilRequests";
import { changePassword } from "../PerfilActions";
import { reset } from "redux-form";

class AlterarSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async onSubmit(values) {
    const { changePassword } = this.props;
    const saveResult = await changePasswordProfile(values);
    if (!saveResult.data.success) {
      saveResult.data.errors.forEach(erro => {
        const options = {
          place: "tr",
          message: erro.message,
          type: "danger",
          icon: "tim-icons icon-bell-55",
          autoDismiss: 5
        };
        this.refs.notificationAlert.notificationAlert(options);
      });
    } else {
      changePassword(saveResult.data);
      const options = {
        place: "tr",
        message: "Sua senha foi alterada!",
        type: "success",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 3
      };
      this.refs.notificationAlert.notificationAlert(options);
      this.props.reset();
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Row>
        <Col md="12">
          <Card>
            <form
              onSubmit={handleSubmit(values => this.onSubmit(values))}
              className="form"
            >
              <div className="rna-container">
                <NotificationAlert ref="notificationAlert" />
              </div>
              <CardHeader>
                <h5 className="title">Alterar Senha</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <label>Senha Atual</label>
                      <Field
                        component={Input}
                        placeholder="Senha Atual"
                        type="password"
                        name="password"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <label>Nova Senha</label>
                      <Field
                        component={Input}
                        placeholder="Nova Senha"
                        type="password"
                        name="new_password"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="success" type="submit">
                  Salvar Alteração
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Col>
      </Row>
    );
  }
}

AlterarSenha = reduxForm({ form: "alterarSenhaForm" })(AlterarSenha);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePassword
    },
    dispatch
  );
export default connect(
  null,
  mapDispatchToProps
)(AlterarSenha);
