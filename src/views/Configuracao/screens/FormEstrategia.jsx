import React, { Component } from 'react'
import Select from "react-select";
import Switch from "react-bootstrap-switch";
import MaskedInput from 'react-text-mask';
import NotificationAlert from "react-notification-alert";
import {
  Row,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap'

import {
  getConfiguracao,
  postConfiguracao,
} from '../ConfiguracaoActions';

class FormEstrategia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candleSize: null,
      multipleSelectTargetCurrency: null,
      alterState: false,
      baseCurrency: 'USD',
      purchaseQuantity: '',
      profit: '',
      stop: '',
      sellForIndicator: false,
      maxOrdersOpen: '',
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

  handleSwitch = (e) => {
    const name = e.props.name;
    const value = e.props.value;
    this.setState({ [name]: !value });
  }

  async componentDidMount() {
    const configuracao = await getConfiguracao();
    const candle = configuracao.data.configuracao.candle_size;
    const target = configuracao.data.configuracao.target_currency;
    let arraytarget = [];
    switch (candle) {
      case '5m':
        this.setState({
          candleSize: { value: '5m', label: '5 minutos' }
        });
        break;
      case '10m':
        this.setState({
          candleSize: { value: '10m', label: '10 minutos' }
        });
        break;
      case '15m':
        this.setState({
          candleSize: { value: '15m', label: '15 minutos' }
        });
        break;
      case '30m':
        this.setState({
          candleSize: { value: '30m', label: '30 minutos' }
        });
        break;
      case '1h':
        this.setState({
          candleSize: { value: '1h', label: '1 hora' }
        });
        break;
      default:
        break;
    }
    if (target !== null && target !== undefined) {
      if (target.length > 0) {
        arraytarget = target.map(item => {
          return {
            value: item,
            label: item
          }
        });
      }
    }
    this.setState({
      multipleSelectTargetCurrency: arraytarget || '',
      purchaseQuantity: configuracao.data.configuracao.purchase_quantity || '',
      profit: configuracao.data.configuracao.profit || '',
      stop: configuracao.data.configuracao.stop || '',
      sellForIndicator: configuracao.data.configuracao.sellForIndicator || false,
      maxOrdersOpen: configuracao.data.configuracao.maxOrdersOpen || '',
      alterState: false
    });
  }

  onSubmit = async e => {
    e.preventDefault();
    const currencies = this.state.multipleSelectTargetCurrency;
    const arrayCurrencies = currencies.map(item => item.label);
    const values = {
      base_currency: this.state.baseCurrency,
      target_currency: arrayCurrencies,
      purchase_quantity: this.state.purchaseQuantity,
      profit: this.state.profit,
      stop: this.state.stop,
      sellForIndicator: this.state.sellForIndicator,
      maxOrdersOpen: this.state.maxOrdersOpen,
      candle_size: this.state.candleSize.value,
      strategyState: true
    }
    await postConfiguracao(values);
    const options = {
      place: "tr",
      message: "Estratégia gravada com sucesso!",
      type: "success",
      icon: "tim-icons icon-check-2",
      autoDismiss: 4
    };
    this.refs.notificationAlert.notificationAlert(options);
    this.setState({
      alterState: false,
      onSubmited: true
    });
  }

  isValidated = () => {
    if (this.state.apiKey !== ''
      && this.state.candleSize !== null
      && this.state.maxOrdersOpen !== ''
      && this.state.multipleSelectTargetCurrency !== null
      && this.state.profit !== ''
      && this.state.purchaseQuantity !== ''
      && this.state.sellForIndicator !== ''
      && this.state.onSubmited === true) {
      return true;
    } else {
      const options = {
        place: "tr",
        message: "Todos os campos precisam ser preenchidos e o formulário enviado!",
        type: "danger",
        icon: "tim-icons icon-simple-remove",
        autoDismiss: 4
      };
      this.refs.notificationAlert.notificationAlert(options);
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
          Estratégia
                </h5>
        <Form className="form-horizontal" onSubmit={this.onSubmit}>
          <Row className="justify-content-center mt-5">
            <Col xs="12">
              <Row>
                <Label sm="2">Moeda base</Label>
                <Col sm="10">
                  <FormGroup>
                    <p className="form-control-static">
                      USD
                                        </p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label sm="2">Moedas Alvo</Label>
                <Col sm="10">
                  <FormGroup>

                    <Select
                      className="react-select info"
                      classNamePrefix="react-select"
                      placeholder="moedas à negociar"
                      name="multipleSelectTargetCurrency"
                      isDisabled={this.state.alterState ? false : true}
                      closeMenuOnSelect={false}
                      isMulti
                      value={this.state.multipleSelectTargetCurrency}
                      onChange={value =>
                        this.setState({ multipleSelectTargetCurrency: value })
                      }
                      options={[
                        {
                          value: "",
                          label: " Escolha as moedas",
                          isDisabled: true
                        },
                        { value: "BTC", label: "BTC" },
                        { value: "ETH", label: "ETH" },
                        { value: "ETC", label: "ETC" },
                        { value: "XRP", label: "XRP" },
                        { value: "LTC", label: "LTC" },
                        { value: "BCH", label: "BCH" },
                        { value: "ZEC", label: "ZEC" },
                        { value: "TRX", label: "TRX" },
                        { value: "BSV", label: "BSV" },
                      ]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label sm="2">Valor por ordem</Label>
                <Col sm="10">
                  <FormGroup>
                    <MaskedInput
                      mask={[/[1-9]/, /\d/, /\d/]}
                      name="purchaseQuantity"
                      placeholder="valor mínimo para compra $20 valor máximo $999"
                      type="text"
                      disabled={this.state.alterState ? false : true}
                      guide={false}
                      value={this.state.purchaseQuantity}
                      onChange={this.handleChange}
                      render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label sm="2">Ganho por Ordem</Label>
                <Col sm="10">
                  <FormGroup>
                    <MaskedInput
                      mask={[/[0-1]/, '.', /[0-9]/, /[0-9]/]}
                      name="profit"
                      placeholder="exemplos de percentual - 0.01 = 1%, 0.10 = 10%, 1.00 = 100%"
                      type="text"
                      disabled={this.state.alterState ? false : true}
                      guide={false}
                      value={this.state.profit}
                      onChange={this.handleChange}
                      render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label sm="2">Stop de Ordem</Label>
                <Col sm="10">
                  <FormGroup>
                    <MaskedInput
                      mask={[/[0-1]/, '.', /[0-9]/, /[0-9]/]}
                      name="stop"
                      placeholder="exemplos de percentual - 0.01 = 1%, 0.10 = 10%, 1.00 = 100%"
                      type="text"
                      disabled={this.state.alterState ? false : true}
                      guide={false}
                      value={this.state.stop}
                      onChange={this.handleChange}
                      render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label sm="2">Vender pelo indicador</Label>
                <Col sm="10">
                  <FormGroup style={{ paddingTop: 6 }}>
                    <Switch
                      name="sellForIndicator"
                      disabled={this.state.alterState ? false : true}
                      value={this.state.sellForIndicator}
                      onChange={this.handleSwitch}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label sm="2">Max ordens abertas</Label>
                <Col sm="10">
                  <FormGroup>
                    <MaskedInput
                      mask={[/[1-9]/, /\d/]}
                      name="maxOrdersOpen"
                      placeholder="Máximo de ordens abertas por moeda"
                      type="text"
                      disabled={this.state.alterState ? false : true}
                      guide={false}
                      value={this.state.maxOrdersOpen}
                      onChange={this.handleChange}
                      render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Label sm="2">Tamanho do candle</Label>
                <Col sm="10">
                  <FormGroup>
                    <Select
                      className="react-select info"
                      classNamePrefix="react-select"
                      name="candleSelect"
                      isDisabled={this.state.alterState ? false : true}
                      value={this.state.candleSize}
                      onChange={value =>
                        this.setState({ candleSize: value })
                      }
                      options={[
                        { value: "1m", label: "1 minuto" },
                        { value: "5m", label: "5 minutos" },
                        { value: "30m", label: "30 minutos" },
                        { value: "1h", label: "1 hora" }
                      ]}
                      placeholder="Escolha o período de candle"
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

export default FormEstrategia;
