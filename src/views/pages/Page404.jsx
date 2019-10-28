import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardGroup,
  Col,
  Container,
  Row
} from "reactstrap";
import bgImagem from "../../assets/img/bg-login.jpg";
import logo from "../../assets/img/wolfbot-logo.png";
class Page404 extends Component {
  render() {
    return (
      <div
        className="content"
        style={{ backgroundImage: "url(" + bgImagem + ")" }}
      >
        <div className="app flex-row align-items-center ComponentAuth">
          <Container className="ContainerAuth">
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card
                    className="cardAccount card p-4"
                    style={{ backgroundColor: "#131313" }}
                  >
                    <CardBody>
                      <img
                        src="https://raw.githubusercontent.com/wolfbot-br/wolfbot-frontend/master/public/dist/img/account/404.png"
                        width="160px"
                        height="70px"
                        style={{ display: "block", margin: "10px auto" }}
                      />
                      <h1 style={{ textAlign: "center" }}>Oops!</h1>
                      <p className="text-white" style={{ textAlign: "center" }}>
                        A página que você está procurando não foi encontrada.
                      </p>
                    </CardBody>
                    <CardFooter className="pageCardFooter p-4">
                      <Row className="justify-content-center" />
                    </CardFooter>
                    <CardFooter className="pageCardFooter p-4">
                      <Row className="justify-content-center">
                        <img
                          src={logo}
                          width="50px"
                          height="30px"
                          style={{ display: "block", margin: "10px auto" }}
                        />
                      </Row>
                      <p style={{ textAlign: "center" }} className="text-white">
                        Wolfbot
                      </p>
                    </CardFooter>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card
                    className="cardAccount card p-4"
                    style={{ backgroundColor: "#131313" }}
                  />
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Page404;
