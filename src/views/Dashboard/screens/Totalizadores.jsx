import React from "react";
import { Row, Col, Card, CardBody, CardTitle, CardFooter } from "reactstrap";

const Totalizadores = props => {
  const { totalizers } = props;
  return (
    <Row>
      <Col lg="3" md="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col xs="5">
                <div className="info-icon text-center icon-warning">
                  <i className="tim-icons icon-coins" />
                </div>
              </Col>
              <Col xs="7">
                <div className="numbers">
                  <p className="card-category">Resultado do dia</p>
                  <CardTitle tag="h3">{totalizers.dayResult}</CardTitle>
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats">
              <i className="tim-icons icon-sound-wave" /> Totalizador de
              operações do dia
            </div>
          </CardFooter>
        </Card>
      </Col>
      <Col lg="3" md="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col xs="5">
                <div className="info-icon text-center icon-primary">
                  <i className="tim-icons icon-money-coins" />
                </div>
              </Col>
              <Col xs="7">
                <div className="numbers">
                  <p className="card-category">Resultado geral</p>
                  <CardTitle tag="h3">{totalizers.overallResult}</CardTitle>
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats">
              <i className="tim-icons icon-sound-wave" /> Totalizador de
              operações gerais
            </div>
          </CardFooter>
        </Card>
      </Col>
      <Col lg="3" md="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col xs="5">
                <div className="info-icon text-center icon-success">
                  <i className="tim-icons icon-cart" />
                </div>
              </Col>
              <Col xs="7">
                <div className="numbers">
                  <p className="card-category">Ordens abertas</p>
                  <CardTitle tag="h3">{totalizers.openOrders}</CardTitle>
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats">
              <i className="tim-icons icon-sound-wave" /> Totalizador de ordens
              abertas
            </div>
          </CardFooter>
        </Card>
      </Col>
      <Col lg="3" md="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col xs="5">
                <div className="info-icon text-center icon-danger">
                  <i className="tim-icons icon-bag-16" />
                </div>
              </Col>
              <Col xs="7">
                <div className="numbers">
                  <p className="card-category">Ordens fechadas</p>
                  <CardTitle tag="h3">{totalizers.closeOrders}</CardTitle>
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats">
              <i className="tim-icons icon-sound-wave" /> Totalizador de ordens
              finalizadas
            </div>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

export default Totalizadores;
