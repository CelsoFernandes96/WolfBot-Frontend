import React from "react";
import NotificationAlert from "react-notification-alert";
import bgImagem from "../../assets/img/bg-login.jpg";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardFooter,
  CardTitle,
  Container,
  Col,
  Row
} from "reactstrap";

import logo from "../../assets/img/wolfbot-logo.png";

class DeletedAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div
          className="content"
          style={{ backgroundImage: "url(" + bgImagem + ")" }}
        >
          <div className="rna-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Container className="ContainerAuth">
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card
                    className="card-default card p-4"
                    style={{ backgroundColor: "#131313" }}
                  >
                    <CardBody>
                      <img
                        src="https://raw.githubusercontent.com/wolfbot-br/wolfbot-frontend/master/public/dist/img/account/done.png"
                        width="125px"
                        height="125px"
                        style={{ display: "block", margin: "10px auto" }}
                      />
                      <CardTitle style={{ textAlign: "center" }} tag="h2">
                        Sua conta foi excluída com sucesso.
                      </CardTitle>
                      <CardTitle style={{ textAlign: "center" }} tag="h4">
                        A equipe Wolfbot agradece pela confiança em utilizar a
                        plataforma para realizar suas operações. Até logo!
                      </CardTitle>
                    </CardBody>
                    <CardFooter className="pageCardFooter p-4">
                      <Row className="justify-content-center">
                        <p className="pageCardText text-muted">
                          Criar uma conta?
                          <Link to="/auth/register">
                            <Button color="link" className="px-0">
                              Cadastro
                            </Button>
                          </Link>
                        </p>
                      </Row>
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
                      <CardTitle
                        style={{ textAlign: "center", color: "#ffffff" }}
                      >
                        Wolfbot
                      </CardTitle>
                    </CardFooter>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default DeletedAccount;
