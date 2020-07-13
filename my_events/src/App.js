import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./components/Home.js"
import { Redirection } from "./components/Redirection.js"
import { Profile } from "./components/Profile.js"
import { Member } from "./components/Member.js"
import { Event } from "./components/Event.js"
import { Organize } from "./components/Organize.js"
import "./index.css"
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }
  render() {
    return (
      <Router>
        <Route exact path="/" component={Redirection}/>
        <Route exact path="/myevents/home" component={Home}/>
        <Route exact path="/myevents/member" component={Member}/>
        <Route exact path="/myevents/profile" component={Profile}/>
        <Route exact path="/myevents/event" component={Event}/>
        <Route exact path="/myevents/organize" component={Organize} />
      </Router>
    );
  }
}

export default App;
