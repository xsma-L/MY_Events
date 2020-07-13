import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import "./Event.css";
import FacebookLogin from 'react-facebook-login';

export class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      id: null,
      name: null,
      picture: null,
      title: null,
      image: null,
      date: null,
      place: null,
      city: null,
      country: null,
      description: null
    }
  }

  componentDidMount(){
    this.setState({
      auth: this.props.location.state.auth,
      id: this.props.location.state.id,
      name: this.props.location.state.name,
      picture: this.props.location.state.picture,
      title: this.props.location.state.all.title,
      image: this.props.location.state.image.image,
      date: this.props.location.state.date,
      place: this.props.location.state.all.venue_name,
      city: this.props.location.state.all.city_name,
      country: this.props.location.state.all.country_name,
      description: this.props.location.state.all.description
    })
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

  render() {
    let facebookData;
    localStorage.getItem('auth') ?
      this.state.auth ?
        facebookData = (
          <Link to={{
            pathname: '/myevents/member',
            state: {
              auth: this.state.auth,
              id: this.state.id,
              picture: this.state.picture,
              name: this.state.name
            }
          }}>
            <button className="user_infos" onClick={this.showMenu}>
              <img src={this.state.picture} alt={this.state.name}/>
              <p>{this.state.name}</p>
            </button>
          </Link>
        ) :
        facebookData = (
          <FacebookLogin
            appId="316631749293090"
            autoLoad={false}
            fields="name,picture"
            callback={this.responseFacebook}
          />
        ) :
        facebookData = (
          <Link to={{
            pathname: '/myevents/member',
            state: {
              auth: this.state.auth,
              id: this.state.id,
              picture: this.state.picture,
              name: this.state.name
            }
          }}>
            <button className="user_infos" onClick={this.showMenu}>
              <img src={this.state.picture} alt={this.state.name}/>
              <p>{this.state.name}</p>
            </button>
          </Link>
        );

        let organizeButton;
        localStorage.getItem('auth') ?
          this.state.auth ?
            organizeButton = (
              <Link to={{
                pathname: '/myevents/organize'
              }}>
                <button>Organiser une sortie</button>
              </Link>
            ) :
            organizeButton = (
              <Link to={{
                pathname: '/myevents/organize'
              }}>
                <button style={{display: 'none'}}>Organiser une sortie</button>
              </Link>
            ) :
            organizeButton = (
              <Link to={{
                pathname: '/myevents/organize'
              }}>
                <button>Organiser une sortie</button>
              </Link>
            );

    return (
      <Fragment>
        <div className="topnav">
          <div className="topnav-centered">
            <Link to="/" className="active">EVENT APP</Link>
          </div>
          <div className="topnav-right">
            <>{facebookData}</>
          </div>
        </div>
        <div className="container2">
          <h2>{this.state.title}</h2>
          <div className="head">
            <div className="image_event">
              <img src={this.state.image} width="200" height="200" alt="event_image" />
            </div>
            <div className="informations">
              <p><b>Date —</b> {this.state.date} <img src="https://img.icons8.com/ios-filled/100/000000/calendar.png" width="20px" alt="img_calendar"/></p>
              <p><b>Lieu —</b> {this.state.place}, {this.state.city} ({this.state.country}) <img src="https://img.icons8.com/ios-glyphs/30/000000/city.png" width="20px" alt="img_place" /></p>
              <>{organizeButton}</>
            </div>
          </div>
          <div className="body">{parse(this.props.location.state.all.description)}</div>
        </div>
      </Fragment>
    )
  }
}

export default Event;
