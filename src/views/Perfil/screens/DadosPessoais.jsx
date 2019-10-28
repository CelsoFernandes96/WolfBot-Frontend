import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  FormGroup,
  Col
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import Input from "../../../components/Input/Input";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserProfile, saveUserProfile } from "../PerfilRequests";
import { getUser, saveUser } from "../PerfilActions";

class DadosPessoais extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async onSubmit(values) {
    const { saveUser } = this.props;
    const saveResult = await saveUserProfile(values);
    if (!saveResult.data.success) {
      saveResult.data.errors.forEach(erro => {
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
      saveUser(saveResult.data);
      const options = {
        place: "tr",
        message: "Suas informações foram salvas",
        type: "success",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 3
      };
      this.refs.notificationAlert.notificationAlert(options);
    }
  }

  async componentWillMount() {
    const { getUser } = this.props;
    const user = await getUserProfile();
    try {
      if (!user.data.success) {
        user.data.errors.forEach(erro => {
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
        getUser(user);
        this.props.initialize({
          email: this.props.email,
          name: this.props.name,
          lastname: this.props.lastname,
          address: this.props.address,
          city: this.props.city,
          country: this.props.country,
          about: this.props.about
        });
      }
    } catch (error) {
      this.props.initialize({
        email: this.props.email,
        name: this.props.name,
        lastname: this.props.lastname,
        address: this.props.address,
        city: this.props.city,
        country: this.props.country,
        about: this.props.about
      });
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Card>
        <form
          onSubmit={handleSubmit(value => this.onSubmit(value))}
          className="form"
        >
          <div className="rna-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <CardHeader>
            <h5 className="title">Editar Perfil</h5>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="pr-md-1" md="5">
                <FormGroup>
                  <label>Email</label>
                  <Field
                    component={Input}
                    placeholder="Email"
                    type="text"
                    name="email"
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1" md="6">
                <FormGroup>
                  <label>Nome</label>
                  <Field
                    component={Input}
                    placeholder="Nome"
                    type="text"
                    name="name"
                  />
                </FormGroup>
              </Col>
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <label>Sobrenome</label>
                  <Field
                    component={Input}
                    placeholder="Sobrenome"
                    type="text"
                    name="lastname"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label>Endereço</label>
                  <Field
                    component={Input}
                    placeholder="Endereço"
                    type="text"
                    name="address"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <label>Cidade</label>
                  <Field
                    component={Input}
                    placeholder="Cidade"
                    type="text"
                    name="city"
                  />
                </FormGroup>
              </Col>
              <Col className="px-md-1" md="4">
                <FormGroup>
                  <label>País</label>
                  <Field
                    component={Input}
                    placeholder="País"
                    type="text"
                    name="country"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="8">
                <FormGroup>
                  <label>Sobre</label>
                  <Field
                    component={Input}
                    placeholder="Sobre"
                    type="textarea"
                    name="about"
                    rows="4"
                  />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Button className="btn-fill" color="success" type="submit">
              Salvar Alterações
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }
}

DadosPessoais = reduxForm({ form: "dadosPessoaisForm" })(DadosPessoais);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUser, saveUser }, dispatch);
const mapStateToProps = state => ({
  email: state.profile.email,
  name: state.profile.name,
  lastname: state.profile.lastname,
  address: state.profile.address,
  city: state.profile.city,
  country: state.profile.country,
  about: state.profile.about
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DadosPessoais);
