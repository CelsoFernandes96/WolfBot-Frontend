import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import GraphicTotalOrden from './screens/GraphicTotalOrden';
import GraphicOrderPerDay from './screens/GraphicOrderPerDay';
import GraphicProfitPerDay from './screens/GraphicProfitPerDay';

class Estatisticas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="4">
              <GraphicTotalOrden filters={this.props.filters} />
            </Col>
            <Col lg="8">
              <GraphicOrderPerDay filters={this.props.filters} />
            </Col>
            <Col lg="12">
              <GraphicProfitPerDay filters={this.props.filters} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Estatisticas
