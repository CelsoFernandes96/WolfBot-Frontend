import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import TableHistorico from './screens/TableHistorico'


class Historico extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='content'>
        <Row>
          <Col>
            <TableHistorico />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Historico