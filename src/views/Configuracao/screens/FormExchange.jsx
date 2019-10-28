import React, { Component } from 'react';
import Select from "react-select";
import NotificationAlert from "react-notification-alert";
import {
  Row,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';

import {
  getConfiguracao,
  testConfiguracao,
  postConfiguracao,
} from '../ConfiguracaoActions'
class FormExchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchange: '',
      apiKey: '',
      apiSecret: '',
      alterState: false,
      onSubmited: false,
    };
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleState = () => {
    this.setState({ alterState: !this.state.alterState })
  }

  async componentDidMount() {
    const configuracao = await getConfiguracao();
    if (configuracao.status === 200) {
      const configResult = configuracao.data.configuracao
      this.setState({
        apiKey: configResult ? configResult.api_key : '',
        apiSecret: configResult ? configResult.secret : '',
        alterState: false
      });
      if (configResult !== null) {
        if (configResult.exchange === 'bitfinex') {
          this.setState({
            exchange: { value: "2", label: "bitfinex" }
          });
        } else if (configResult.exchange === 'bittrex') {
          this.setState({
            exchange: { value: "1", label: "bittrex" }
          });
        }
      }
    } else {
      this.setState({ alterState: true });
    }
  }

  onSubmit = async e => {
    e.preventDefault();
    const values = {
      exchange: this.state.exchange.label,
      api_key: this.state.apiKey,
      secret: this.state.apiSecret,
    }
    await postConfiguracao(values);
    const test = await testConfiguracao();
    console.log(test.data)
    if (test.status === 200 && JSON.stringify(test.data.saldo) !== '{}') {
      const options = {
        place: "tr",
        message: "Exchange conectada!",
        type: "success",
        icon: "tim-icons icon-check-2",
        autoDismiss: 4
      };
      this.refs.notificationAlert.notificationAlert(options);
      const value = {
        exchangeState: true,
      }
      await postConfiguracao(value);
      this.setState({
        alterState: false,
        onSubmited: true
      });
    } else {
      const options = {
        place: "tr",
        message: "Apikey ou secret inválido para a exchange selecionada!",
        type: "danger",
        icon: "tim-icons icon-simple-remove",
        autoDismiss: 4
      };
      this.refs.notificationAlert.notificationAlert(options);
      const value = {
        exchangeState: false,
      }
      await postConfiguracao(value);
      this.setState({ alterState: true });
    }
  }

  isValidated = () => {
    if (this.state.apiKey !== ''
      && this.state.apiSecret !== ''
      && this.state.exchange !== ''
      && this.state.onSubmited === true) {
      return true;
    } else {
      return false
    }
  };

  render() {
    return (
      <>
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <h5 className="info-text">
          Configuração
                </h5>
        <Form className="form-horizontal" onSubmit={this.onSubmit}>
          <Row className="justify-content-center mt-5">
            <Col xs="10">
              <Row>
                <Label sm="2">Exchange</Label>
                <Col sm="10">
                  <FormGroup>
                    <Select
                      className="react-select info"
                      classNamePrefix="react-select"
                      isDisabled={this.state.alterState ? false : true}
                      name="singleSelect"
                      value={this.state.exchange}
                      onChange={value =>
                        this.setState({ exchange: value })
                      }
                      options={[
                        { value: "1", label: "bittrex" },
                        { value: "2", label: "bitfinex" }
                      ]}
                      placeholder="Escolha sua exchange"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label sm="2">Api key</Label>
                <Col sm="10">
                  <FormGroup>
                    <Input
                      type="text"
                      disabled={this.state.alterState ? false : true}
                      placeholder="chave da api"
                      name="apiKey"
                      value={this.state.apiKey}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label sm="2">Api Secret</Label>
                <Col sm="10">
                  <FormGroup>
                    <Input
                      type="text"
                      disabled={this.state.alterState ? false : true}
                      placeholder="chave secreta da api"
                      name="apiSecret"
                      value={this.state.apiSecret}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                className="btn-fill"
                color="primary"
                onClick={this.handleState}
                disabled={this.state.alterState ? true : false}
              >
                Alterar
                            </Button>
              <Button
                className="btn-fill"
                color="success"
                disabled={this.state.alterState ? false : true}
                type="submit"
              >
                Gravar
                            </Button>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}

export default FormExchange;
