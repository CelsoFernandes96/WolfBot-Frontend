import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Ativos from './screens/Ativos'

class Carteira extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className='content'>
        <Row>
          <Col>
            <Ativos />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Carteira
