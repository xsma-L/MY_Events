import React, { Component} from "react";
import { Redirect } from 'react-router-dom'

export class Redirection extends Component {
    render() {
        return (
        <Redirect to='/myevents/home' />
    );
  }
}

export default Redirection;
