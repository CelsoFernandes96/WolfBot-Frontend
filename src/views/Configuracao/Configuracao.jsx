import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
import Step1 from "./screens/FormExchange.jsx";
import Step2 from "./screens/FormEstrategia.jsx";
import Step3 from "./screens/FormIndicadores.jsx";

var steps = [
  {
    stepName: "Exchange",
    stepIcon: "tim-icons icon-single-02",
    component: Step1
  },
  {
    stepName: "Estratégia",
    stepIcon: "tim-icons icon-settings-gear-63",
    component: Step2
  },
  {
    stepName: "indicadores",
    stepIcon: "tim-icons icon-delivery-fast",
    component: Step3
  }
];

class Configuracao extends React.Component {

  finishButtonClick = async (allStepStates) => {
    this.props.history.replace("/admin/dashboard");
  };
  render() {
    return (
      <>
        <div className="content">
          <Col className="mr-auto ml-auto" md="10">
            <ReactWizard
              steps={steps}
              navSteps
              validate
              title="Configuração do bot"
              description="Configuração necessária para utilização do bot."
              headerTextCenter
              finishButtonClasses="btn-wd btn-info"
              finishButtonText="Finalizar"
              nextButtonClasses="btn-wd btn-info"
              nextButtonText="Próximo"
              previousButtonClasses="btn-wd"
              previousButtonText="Anterior"
              finishButtonClick={this.finishButtonClick}
              progressbar
              color="blue"
            />
          </Col>
        </div>
      </>
    );
  }
}

export default Configuracao;