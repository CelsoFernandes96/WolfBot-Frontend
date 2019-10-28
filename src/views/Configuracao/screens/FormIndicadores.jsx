import React, { Component } from 'react'
import Switch from "react-bootstrap-switch";
import NotificationAlert from "react-notification-alert";
import MaskedInput from 'react-text-mask';
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
  postConfiguracao,
} from '../ConfiguracaoActions';

class FormIndicadores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emaState: true,
      emaShortPeriod: 9,
      emaLongPeriod: 12,

      macdState: false,
      macdShortPeriod: 10,
      macdLongPeriod: 20,
      macdSignalPeriod: 9,

      stochState: false,
      stochKperiod: 10,
      stochKslowPeriod: 15,
      stochDperiod: 8,

      cciState: false,
      cciPeriod: 10,

      bbandsState: false,
      bbandsPeriod: 4,
      bbandsStddevPeriod: 5,

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

  handleSwitch = e => {
    const name = e.props.name;
    const value = e.props.value;
    this.setState({ [name]: !value });
  }

  async componentDidMount() {
    const configuracao = await getConfiguracao();
    if (configuracao.data.configuracao.indicatorState !== null && configuracao.data.configuracao.indicatorState !== undefined) {
      this.setState({
        emaState: configuracao.data.configuracao.strategy.indicators.ema.status,
        emaShortPeriod: configuracao.data.configuracao.strategy.indicators.ema.short_period,
        emaLongPeriod: configuracao.data.configuracao.strategy.indicators.ema.long_period,
        macdState: configuracao.data.configuracao.strategy.indicators.macd.status,
        macdShortPeriod: configuracao.data.configuracao.strategy.indicators.macd.short_period,
        macdLongPeriod: configuracao.data.configuracao.strategy.indicators.macd.long_period,
        macdSignalPeriod: configuracao.data.configuracao.strategy.indicators.macd.signal_period,
        stochState: configuracao.data.configuracao.strategy.indicators.stoch.status,
        stochKperiod: configuracao.data.configuracao.strategy.indicators.stoch.k_period,
        stochKslowPeriod: configuracao.data.configuracao.strategy.indicators.stoch.k_slow_period,
        stochDperiod: configuracao.data.configuracao.strategy.indicators.stoch.d_period,
        cciState: configuracao.data.configuracao.strategy.indicators.cci.status,
        cciPeriod: configuracao.data.configuracao.strategy.indicators.cci.period,
        bbandsState: configuracao.data.configuracao.strategy.indicators.bbands.status,
        bbandsPeriod: configuracao.data.configuracao.strategy.indicators.bbands.period,
        bbandsStddevPeriod: configuracao.data.configuracao.strategy.indicators.bbands.stddev_period,
      });
    }

  }

  onSubmit = async e => {
    e.preventDefault();
    const values = {
      indicatorState: true,
      strategy: {
        indicators: {
          ema: {
            status: this.state.emaState,
            short_period: this.state.emaShortPeriod,
            long_period: this.state.emaLongPeriod,
          },
          macd: {
            status: this.state.macdState,
            short_period: this.state.macdShortPeriod,
            long_period: this.state.macdLongPeriod,
            signal_period: this.state.macdSignalPeriod,
          },
          cci: {
            status: this.state.cciState,
            period: this.state.cciPeriod,
          },
          stoch: {
            status: this.state.stochState,
            k_period: this.state.stochKperiod,
            k_slow_period: this.state.stochKslowPeriod,
            d_period: this.state.stochDperiod,
          },
          bbands: {
            status: this.state.bbandsState,
            period: this.state.bbandsPeriod,
            stddev_period: this.state.bbandsStddevPeriod,
          },
        }
      }
    }
    await postConfiguracao(values);
    const options = {
      place: "tr",
      message: "Indicadores gravados com sucesso!",
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
    if (this.state.emaState !== ''
      && this.state.emaShortPeriod !== ''
      && this.state.emaLongPeriod !== ''
      && this.state.macdState !== ''
      && this.state.macdShortPeriod !== ''
      && this.state.macdLongPeriod !== ''
      && this.state.macdSignalPeriod !== ''
      && this.state.stochState !== ''
      && this.state.stochKperiod !== ''
      && this.state.stochKslowPeriod !== ''
      && this.state.stochDperiod !== ''
      && this.state.cciState !== ''
      && this.state.cciPeriod !== ''
      && this.state.bbandsState !== ''
      && this.state.bbandsPeriod !== ''
      && this.state.bbandsStddevPeriod !== ''
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
          Indicadores
        </h5>
        <Row className="mt-5">
          <Form className="form-horizontal" onSubmit={this.onSubmit}>
            <Col>
              <Row className="ml-5 mr-5">
                <Label style={{ marginTop: '10px' }}>Indicador - EMA:</Label>
                <Col md={2} style={{ marginTop: '8px' }}>
                  <FormGroup>
                    <Switch
                      name="emaState"
                      value={this.state.emaState}
                      disabled={this.state.alterState ? false : true}
                      onChange={this.handleSwitch}
                    />
                  </FormGroup>
                </Col>
                {this.state.emaState ? (
                  <>
                    <Label style={{ marginTop: '10px' }}>short period:</Label>
                    <Col>
                      <FormGroup>
                        <MaskedInput
                          mask={[/[1-9]/, /\d/, /\d/]}
                          name="emaShortPeriod"
                          type="text"
                          disabled={this.state.alterState ? false : true}
                          guide={false}
                          value={this.state.emaShortPeriod}
                          onChange={this.handleChange}
                          render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                        />
                      </FormGroup>
                    </Col>
                    <Label style={{ marginTop: '10px' }}>long period:</Label>
                    <Col>
                      <FormGroup>
                        <MaskedInput
                          mask={[/[1-9]/, /\d/, /\d/]}
                          name="emaLongPeriod"
                          type="text"
                          disabled={this.state.alterState ? false : true}
                          guide={false}
                          value={this.state.emaLongPeriod}
                          onChange={this.handleChange}
                          render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                        />
                      </FormGroup>
                    </Col>
                  </>
                ) : null}
              </Row>
            </Col>
            <Col>
              <Row className="ml-5 mr-5">
                <Label style={{ marginTop: '10px' }}>Indicador - MACD:</Label>
                <Col md={2} style={{ marginTop: '8px' }}>
                  <FormGroup>
                    <Switch
                      name="macdState"
                      disabled={this.state.alterState ? false : true}
                      value={this.state.macdState}
                      onChange={this.handleSwitch}
                    />
                  </FormGroup>
                </Col>
                {this.state.macdState ? (
                  <>
                    <Label style={{ marginTop: '10px' }}>short period:</Label>
                    <Col>
                      <FormGroup>
                        <MaskedInput
                          mask={[/[1-9]/, /\d/, /\d/]}
                          name="macdShortPeriod"
                          type="text"
                          disabled={this.state.alterState ? false : true}
                          guide={false}
                          value={this.state.macdShortPeriod}
                          onChange={this.handleChange}
                          render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                        />
                      </FormGroup>
                    </Col>
                    <Label style={{ marginTop: '10px' }}>long period:</Label>
                    <Col>
                      <FormGroup>
                        <MaskedInput
                          mask={[/[1-9]/, /\d/, /\d/]}
                          name="macdLongPeriod"
                          type="text"
                          disabled={this.state.alterState ? false : true}
                          guide={false}
                          value={this.state.macdLongPeriod}
                          onChange={this.handleChange}
                          render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                        />
                      </FormGroup>
                    </Col>
                    <Label style={{ marginTop: '10px' }}>signal period:</Label>
                    <Col>
                      <FormGroup>
                        <MaskedInput
                          mask={[/[1-9]/, /\d/, /\d/]}
                          name="macdSignalPeriod"
                          type="text"
                          disabled={this.state.alterState ? false : true}
                          guide={false}
                          value={this.state.macdSignalPeriod}
                          onChange={this.handleChange}
                          render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                        />
                      </FormGroup>
                    </Col>
                  </>
                ) : null}
              </Row>
            </Col>
            <Col>
              <Row className="ml-5 mr-5">
                <Label style={{ marginTop: '10px' }}>Indicador - CCI:</Label>
                <Col md={2} style={{ marginTop: '8px' }}>
                  <FormGroup>
                    <Switch
                      name="cciState"
                      disabled={this.state.alterState ? false : true}
                      value={this.state.cciState}
                      onChange={this.handleSwitch}
                    />
                  </FormGroup>
                </Col>
                {this.state.cciState ? (
                  <>
                    <Label style={{ marginTop: '10px' }}>period:</Label>
                    <Col>
                      <FormGroup>
                        <MaskedInput
                          mask={[/[1-9]/, /\d/, /\d/]}
                          name="cciPeriod"
                          type="text"
                          disabled={this.state.alterState ? false : true}
                          guide={false}
                          value={this.state.cciPeriod}
                          onChange={this.handleChange}
                          render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                        />
                      </FormGroup>
                    </Col>
                  </>
                ) : null}
              </Row>
            </Col>
            <Col>
              <Row className="ml-5 mr-5">
                <Label style={{ marginTop: '10px' }}>Indicador - BBANDS:</Label>
                <Col md={2} style={{ marginTop: '8px' }}>
                  <FormGroup>
                    <Switch
                      name="bbandsState"
                      disabled={this.state.alterState ? false : true}
                      value={this.state.bbandsState}
                      onChange={this.handleSwitch}
                    />
                  </FormGroup>
                </Col>
                {this.state.bbandsState ? (
                  <>
                    <Label style={{ marginTop: '10px' }}>period:</Label>
                    <Col>
                      <FormGroup>
                        <MaskedInput
                          mask={[/[1-9]/, /\d/, /\d/]}
                          name="bbandsPeriod"
                          type="text"
                          disabled={this.state.alterState ? false : true}
                          guide={false}
                          value={this.state.bbandsPeriod}
                          onChange={this.handleChange}
                          render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                        />
                      </FormGroup>
                    </Col>
                    <Label style={{ marginTop: '10px' }}>stddev period:</Label>
                    <Col>
                      <FormGroup>
                        <MaskedInput
                          mask={[/[1-9]/, /\d/, /\d/]}
                          name="bbandsStddevPeriod"
                          type="text"
                          disabled={this.state.alterState ? false : true}
                          guide={false}
                          value={this.state.bbandsStddevPeriod}
                          onChange={this.handleChange}
                          render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                        />
                      </FormGroup>
                    </Col>
                  </>
                ) : null}
              </Row>
            </Col>
            <Col>
              <Row className="ml-5 mr-5">
                <Label style={{ marginTop: '10px' }}>Indicador - STOCH:</Label>
                <Col md={2} style={{ marginTop: '8px' }}>
                  <FormGroup>
                    <Switch
                      name="stochState"
                      disabled={this.state.alterState ? false : true}
                      value={this.state.stochState}
                      onChange={this.handleSwitch}
                    />
                  </FormGroup>
                </Col>
                {this.state.stochState ? (
                  <>
                    <Label style={{ marginTop: '10px' }}>K period:</Label>
                    <Col>
                      <FormGroup>
                        <MaskedInput
                          mask={[/[1-9]/, /\d/, /\d/]}
                          name="stochKperiod"
                          type="text"
                          disabled={this.state.alterState ? false : true}
                          guide={false}
                          value={this.state.stochKperiod}
                          onChange={this.handleChange}
                          render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                        />
                      </FormGroup>
                    </Col>
                    <Label style={{ marginTop: '10px' }}>K slow period:</Label>
                    <Col>
                      <FormGroup>
                        <MaskedInput
                          mask={[/[1-9]/, /\d/, /\d/]}
                          name="stochKslowPeriod"
                          type="text"
                          disabled={this.state.alterState ? false : true}
                          guide={false}
                          value={this.state.stochKslowPeriod}
                          onChange={this.handleChange}
                          render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                        />
                      </FormGroup>
                    </Col>
                    <Label style={{ marginTop: '10px' }}>D period:</Label>
                    <Col>
                      <FormGroup>
                        <MaskedInput
                          mask={[/[1-9]/, /\d/, /\d/]}
                          name="stochDperiod"
                          type="text"
                          disabled={this.state.alterState ? false : true}
                          guide={false}
                          value={this.state.stochDperiod}
                          onChange={this.handleChange}
                          render={(ref, props) => (<Input innerRef={ref} {...props} />)}
                        />
                      </FormGroup>
                    </Col>
                  </>
                ) : null}
              </Row>
            </Col>
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
        </Row>
      </>
    )
  }
}

export default FormIndicadores;
