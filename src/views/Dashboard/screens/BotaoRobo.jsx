import React, { Component } from "react";
import { Row, Col, CardHeader, CardTitle, CardBody, Card } from "reactstrap";
import Switch from "react-bootstrap-switch";
import { getStatusBot, startOrStopBot } from "../DashboardActions";
import NotificationAlert from "react-notification-alert";

class BotaoRobo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusBot: false,
      statusBuy: false,
      statusSell: false,
      alterState: true
    };
  }

  handleSwitch = async e => {
    const name = e.props.name;
    const value = e.props.value;
    this.setState({ [name]: !value });
    if (name === "statusBot") {
      const values = {
        status_bot: this.state.statusBot,
        status_buy: this.state.statusBuy,
        status_sell: this.state.statusSell
      };
      const result = await startOrStopBot(values);
      console.log(result);
      if (this.state.statusBot === true) {
        const options = {
          place: "tr",
          message: "Robô ligado",
          type: "success",
          icon: "tim-icons icon-bell-55",
          autoDismiss: 5,
          closeButton: false
        };
        this.refs.notificationAlert.notificationAlert(options);
        this.setState({ alterState: false });
      } else {
        const options = {
          place: "tr",
          message: "Desligando Robô.",
          type: "danger",
          icon: "tim-icons icon-bell-55",
          autoDismiss: 5,
          closeButton: false
        };
        this.refs.notificationAlert.notificationAlert(options);
        this.setState({ alterState: true });
      }
    }
  };

  componentDidMount = async () => {
    const result = await getStatusBot();
    if (result.status === 200) {
      const config = result.data.configuracao;
      const statusBot = config ? config.status : null;
      if (statusBot !== null) {
        this.setState({
          statusBot: statusBot.status_bot,
          statusBuy: statusBot.status_buy,
          statusSell: statusBot.status_sell
        });
        if (this.state.statusBot === true) {
          this.setState({ alterState: false });
        } else {
          this.setState({ alterState: true });
        }
      }
    }
  };
  render() {
    return (
      <Card className="card-stats card">
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <CardHeader>
          <CardTitle>
            <i className="tim-icons icon-spaceship text-success" /> Status Robo
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="2">
              <CardTitle tag="h5">
                <i
                  className="tim-icons icon-button-power text-info"
                  style={{ fontSize: 30 }}
                />
              </CardTitle>
            </Col>
            <Col xs="6">
              <CardTitle
                tag="h5"
                className="text-center"
                style={{ paddingTop: 6 }}
              >
                Acionar Robo
              </CardTitle>
            </Col>
            <Col xs="4" style={{ paddingTop: 4, paddingLeft: 0 }}>
              <Switch
                name="statusBot"
                value={this.state.statusBot}
                onChange={this.handleSwitch}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs="2" style={{ marginTop: 10 }}>
              <CardTitle tag="h5">
                <i
                  className="tim-icons icon-cart text-danger"
                  style={{ fontSize: 30 }}
                />
              </CardTitle>
            </Col>
            <Col xs="6" style={{ marginTop: 10 }}>
              <CardTitle
                tag="h5"
                className="text-center"
                style={{ paddingTop: 6 }}
              >
                Acionar Compra
              </CardTitle>
            </Col>
            <Col
              xs="4"
              style={{ paddingTop: 4, paddingLeft: 0, marginTop: 10 }}
            >
              <Switch
                name="statusBuy"
                disabled={this.state.alterState ? false : true}
                value={this.state.statusBuy}
                onChange={this.handleSwitch}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs="2" style={{ marginTop: 10 }}>
              <CardTitle tag="h5">
                <i
                  className="tim-icons icon-coins text-warning"
                  style={{ fontSize: 30 }}
                />
              </CardTitle>
            </Col>
            <Col xs="6" style={{ marginTop: 10 }}>
              <CardTitle
                tag="h5"
                className="text-center"
                style={{ paddingTop: 6 }}
              >
                Acionar Venda
              </CardTitle>
            </Col>
            <Col
              xs="4"
              style={{ paddingTop: 4, paddingLeft: 0, marginTop: 10 }}
            >
              <Switch
                name="statusSell"
                disabled={this.state.alterState ? false : true}
                value={this.state.statusSell}
                onChange={this.handleSwitch}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default BotaoRobo;
