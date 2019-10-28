import React, { Component } from "react";
import Loading from "react-loading";

class ReactLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <Loading
        type={this.props.type}
        color={this.props.color}
        height={this.props.height}
        width={this.props.width}
      />
    );
  }
}
export default ReactLoading;
