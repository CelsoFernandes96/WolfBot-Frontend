import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactLoading from "./ReactLoading";
import bgImagem from "../../assets/img/bg-login.jpg";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <>
        <div
          className="content"
          style={{ backgroundImage: "url(" + bgImagem + ")", height: "750px" }}
        >
          <Container className="ContainerAuth">
            <Row className="justify-content-center">
              <Col md="10">
                <h4
                  style={{
                    textAlign: "center",
                    marginTop: "10%",
                    color: "#20a8d8"
                  }}
                >
                  Carregando!
                </h4>
                <div
                  style={{
                    margin: "0px auto",
                    width: "20%"
                  }}
                >
                  <ReactLoading
                    style={{ textAlign: "center" }}
                    type="bars"
                    color="#20a8d8"
                    heigth="20%"
                    width="100%"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
