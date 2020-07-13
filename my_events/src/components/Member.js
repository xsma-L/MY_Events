import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
// import FacebookLogin from 'react-facebook-login';
// import axios from "axios";
// import "./Events.css";

export class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      id: null,
      picture: null,
      name: null,
      verify: false
    };
  }

  componentDidMount(){ 
    // TODO recupreation des infos user
    if(localStorage.getItem('picture') !== null){
      this.setState({
        auth: this.props.location.state.auth,
        id: this.props.location.state.id,
        name: this.props.location.state.name,
        picture: this.props.location.state.picture,
        image: this.props.location.state.image
      })
    }else{
      this.setState({
        verify: true
      })
    }
    
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  responseFacebook = response => {
    console.log(response);
    if(response.status !== 'unknown')
      this.setState({
        auth: true,
        id: response.id,
        name: response.name,
        picture: response.picture.data.url,
        redirect: true
      });
  }

  logout = () =>{
    // TODO deconnexion
    localStorage.clear()
    this.setState({
      redirect: true
    })
  }

  render() {
    let facebookData;
    facebookData = (
      <button className="user_infos" onClick={this.showMenu}>
        <img src={this.state.picture} alt={this.state.name}/>
        <p>{this.state.name}</p>
      </button>
    );

    var logout 
      if(this.state.verify === true){
        // profile = <Link to="/myevents/profile" className="active">MON PROFILE</Link>
        logout = <span onClick={this.logout}>Déconnexion</span>
      }

    var redirect
    if(this.state.verify){
      redirect = <Redirect to={{ pathname: '/myevents/home' }}/>
    }
    return (
        <Fragment>
        {redirect}
          <div className="topnav">
            <div className="topnav-centered">
              <Link to="/" className="active">EVENT APP</Link>
            </div>
            <div className="topnav-right">
              <>{facebookData}</>
            </div>
            {logout}
          </div>
          <div className="container2">
            <h2>{this.state.title}</h2>
            <div className="head">
              <div className="image_member">
                <img src={this.state.picture} width="200" height="200" alt="event_image" />
              </div>
              <div className="informations">
                <p className="pseudo"><b>{this.state.name}</b></p>
                <p className="biographie">La biographie sera ici...</p>
              </div>
            </div>
            <h2>Liste des sorties</h2>
            <div className="body"></div>
          </div>
        </Fragment>
    )
  }
}
export default Member;
