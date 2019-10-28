import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter
} from "reactstrap";

const ResumoOperacoes = props => {
  const { operationsSummary } = props;
  return (
    <Card className="card-stats card">
      <CardHeader>
        <CardTitle>
          <i className="tim-icons icon-notes text-success" /> Resumo de
          Operaçoes
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col xs="4">
            <CardTitle className="text-center">
              Valor total investido(USD):
            </CardTitle>
          </Col>
          <Col xs="2">
            <CardTitle>{operationsSummary.totalInvested}</CardTitle>
          </Col>
          <Col xs="4">
            <CardTitle className="text-center">
              Retorno do investimento(USD):
            </CardTitle>
          </Col>
          <Col xs="2">
            <CardTitle>{operationsSummary.investimentReturn}</CardTitle>
          </Col>
        </Row>
        <Row>
          <Col xs="4">
            <CardTitle className="text-center">
              Lucro / Perda total(USD):
            </CardTitle>
          </Col>
          <Col xs="2">
            <CardTitle>{operationsSummary.profit}</CardTitle>
          </Col>
          <Col xs="4">
            <CardTitle className="text-center">
              Lucro / Perda total(%):
            </CardTitle>
          </Col>
          <Col xs="2">
            <CardTitle>{operationsSummary.profitPercentual}</CardTitle>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <hr />
        <Row>
          <Col xs="12">
            <CardTitle tag="h3" className="text-center">
              USD Total em Ativos na Exchange
            </CardTitle>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <CardTitle tag="h3" className="text-center text-success">
              $ {operationsSummary.totalAssets}
            </CardTitle>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
};

export default ResumoOperacoes;
