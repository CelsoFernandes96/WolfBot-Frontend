/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" href="/" target="_blank">
                Site
              </a>
            </li>{" "}
            <li className="nav-item">
              <a className="nav-link" href="/auth/sobre">
                Sobre
              </a>
            </li>{" "}
          </ul>
          <div className="copyright">
            © {new Date().getFullYear()} Wolfbot - Todos os direitos reservados{" "}
            <i className="tim-icons icon-bulb-63" />
            <a href="/" target="_blank" />{" "}
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
