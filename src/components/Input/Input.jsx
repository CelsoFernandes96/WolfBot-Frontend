import React from "react";
import { Input } from "reactstrap";

export default props => (
  <Input
    {...props.input}
    className="form-control"
    placeholder={props.placeholder}
    type={props.type}
    maxLength={40}
    disabled={props.disabled ? true : false}
  />
);
