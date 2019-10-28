import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { reduxForm } from "redux-form";

import { entrarEmContato } from "./homeActions";

import { entrarEmContatoRequest } from "./homeRequests";

import "../../assets/css/font-awesome.min.css";
import "../../assets/css/pe-icon-7-stroke.css";
import "../../assets/css/open-sans.css";

import "../../assets/css/landing-page.css";

import bg3 from "../../assets/img/bg-login.jpg";
import home5 from "../../assets/img/template/home5.png";
import bittrex from "../../assets/img/logos/bittrex.png";
import bitfinex from "../../assets/img/logos/bitfinex.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async onSubmit(values) {
    const { entrarEmContato } = this.props;
    const result = await entrarEmContatoRequest(values);
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
      entrarEmContato(values);
      this.props.history.replace("/auth/emailsendpasswordrecovery");
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  render() {
    return (
      <div className="landing-page landing-page1">
        <div className="wrapper">
          <div className="parallax filter-gradient" data-color="blue">
            <div className="parallax-background">
              <img className="parallax-background-image" src={bg3} />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6 hidden-xs">
                  <div className="parallax-image">
                    <img
                      className="phone"
                      src={home5}
                      style={{ marginTop: "20px" }}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-md-offset-1">
                  <div className="description">
                    <h2>
                      <strong>WOLFBOT</strong>
                    </h2>
                    <br />
                    <h5>
                      Plataforma que possibilita realizar transações de
                      criptomoedas de forma automática para seus usuários
                      através de configurações e estratégias que o usuário
                      definir, sempre com o objetivo de realizar o melhor
                      negócio.
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="section section-gray section-clients"
            style={{ backgroundColor: "#fffff" }}
          >
            <div className="container text-center">
              <h4 className="header-text">
                Integração com duas das principais exchanges do mercado
              </h4>
              <p style={{ color: "#000000" }}>
                A Bittrex e a Bitfinex estão disponíveis para integração com a
                plataforma Wolfbot.
                <br />
              </p>
              <div className="logos">
                <ul className="list-unstyled">
                  <li>
                    <img src={bittrex} width="103px" height="43px" />
                  </li>
                  <li>
                    <img src={bitfinex} width="103px" height="53px" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="section section-features"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="container">
              <h4
                className="header-text text-center"
                style={{ backgroundColor: "#000000" }}
              >
                <p>Funcionalidades</p>
              </h4>
              <div className="row">
                <div className="col-md-4">
                  <div className="card card-white">
                    <div className="icon">
                      <i className="pe-7s-note2" />
                    </div>
                    <div className="text">
                      <h4 style={{ color: "#000000" }}>
                        Dashboard de Gerenciamento
                      </h4>
                      <p style={{ color: "#000000" }}>
                        Dashboard para visualizar os resultados obtidos na
                        utilização da plataforma, visualizar em tempo real a
                        situação do robô no processo de monitoramento além de
                        acionar e também definir se é o melhor momento para
                        apenas comprar ou apenas vender.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-white">
                    <div className="icon">
                      <i className="pe-7s-bell" />
                    </div>
                    <h4 style={{ color: "#000000" }}>Bot de Monitoramento</h4>
                    <p style={{ color: "#000000" }}>
                      O Bot de monitoramento foi programado para executar ordens
                      de compra e venda de forma automática, e possui a
                      capacidade para analisar o melhor momento para executar
                      uma operação e fazendo tudo isso com base na estratégia
                      que você achar melhor para trabalhar.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-white">
                    <div className="icon">
                      <i className="pe-7s-graph1" />
                    </div>
                    <h4 style={{ color: "#000000" }}>Ambiente de Backtest</h4>
                    <p style={{ color: "#000000" }}>
                      Teste um modelo de predição utilizando dados históricos, e
                      analise como a sua estratégia teria de comportado em um
                      determinado período do passado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section section-no-padding">
            <div className="parallax filter-gradient" data-color="blue">
              <div className="parallax-background">
                <img className="parallax-background-image" src={bg3} />
              </div>
              <div className="info">
                <h1 style={{ color: "#FFFFFF" }}>Cadastre-se Agora!</h1>
                <p style={{ color: "#FFFFFF" }}>
                  E automatize seu processo de trade
                </p>
                <a
                  href="/auth/register"
                  className="btn btn-neutral btn-lg btn-fill"
                >
                  CRIAR MINHA CONTA
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home = reduxForm({ form: "homeForm" })(Home);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ entrarEmContato }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(Home);
