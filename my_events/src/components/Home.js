import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import parse from 'html-react-parser';
import { BallBeat } from 'react-pure-loaders';
import axios from "axios";
import "./Events.css";
import FacebookLogin from 'react-facebook-login';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {perimetre: 'Catégorie'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      items: [],
      perimetre: 5,
      loading: true,
      some: false,
      categorie: [],
      category: null,
      lieu: null,
      auth: false,
      id: null,
      name: null,
      picture: null,
      redirect: false
    };
  }

  componentDidMount(){
    // TODO get position
    navigator.geolocation.getCurrentPosition(location => {
      var lat = location.coords.latitude
      var long =location.coords.longitude
      localStorage.setItem('latitude', lat);
      localStorage.setItem('longitude', long);
    });
    let Coord = {
      latitude: localStorage.getItem("latitude"),
      longitude: localStorage.getItem("longitude")
    };
    console.log(this.state.auth);

    var user = localStorage.getItem('name')
    if(user !== null){
      this.setState({
        auth: true
      })
    }

    // TODO recuperation des events 
    axios({
      url: `http://api.eventful.com/json/events/search?app_key=xbM4ZKvWJcRjs7FQ&date=Future&where=${Coord.latitude},${Coord.longitude}&within=${this.state.perimetre}`,
      method: "get"
    })
    .then(response => {
      this.setState({
        items: response.data.events.event,
        loading: false, some: true});
      })
      .catch(function(err) {
        console.log(err);
      });

      axios({
        url: `http://api.eventful.com/json/categories/list?app_key=xbM4ZKvWJcRjs7FQ`,
        method: "get"
      })
      .then(response => {
        this.setState({
          categorie: response.data.category});
        })
        .catch(function(err) {
          console.log(err);
        });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value})
  }

  handleSubmit(event) {
    // TODO action sur filtrage
    event.preventDefault();
    this.setState({items: [], loading: true})
    let Coord = {
      latitude: localStorage.getItem("latitude"),
      longitude: localStorage.getItem("longitude")
    };
    if(this.state.category === null){
      if(this.state.lieu === null){
        axios({
          url: `http://api.eventful.com/json/events/search?app_key=xbM4ZKvWJcRjs7FQ&date=Future&where=${Coord.latitude},${Coord.longitude}&within=${this.state.perimetre}`,
          method: "get"
        })
        .then(response => {
          this.setState({ items: response.data.events.event, loading: false});
        })
        .catch(function(err) {
          console.log(err);
        });
      }else{
        axios({
          url: `http://api.eventful.com/json/events/search?app_key=xbM4ZKvWJcRjs7FQ&date=Future&l=${this.state.lieu}&within=${this.state.perimetre}`,
          method: "get"
        })
        .then(response => {
          this.setState({ items: response.data.events.event, loading: false});
        })
        .catch(function(err) {
          console.log(err);
        });
      }
    }else{
      if(this.state.lieu === null){
        axios({
          url: `http://api.eventful.com/json/events/search?app_key=xbM4ZKvWJcRjs7FQ&q=${this.state.category}&date=Future&where=${Coord.latitude},${Coord.longitude}&within=${this.state.perimetre}`,
          method: "get"
        })
        .then(response => {
          this.setState({ items: response.data.events.event, loading: false});
        })
        .catch(function(err) {
          console.log(err);
        });
      }else{
        axios({
          url: `http://api.eventful.com/json/events/search?app_key=xbM4ZKvWJcRjs7FQ&q=${this.state.category}&date=Future&l=${this.state.lieu}&within=${this.state.perimetre}`,
          method: "get"
        })
        .then(response => {
          this.setState({ items: response.data.events.event, loading: false});
        })
        .catch(function(err) {
          console.log(err);
        });
      }
    }
  }

  // TODO connexion facebook
  responseFacebook = response => {
    if(response.status !== 'unknown'){
      localStorage.setItem('auth', true);
      this.setState({
        auth: localStorage.getItem('auth'),
        id: response.id,
        name: response.name,
        picture: response.picture.data.url,
        // redirect: true
      });
      localStorage.setItem('name', response.name);
      localStorage.setItem('picture', response.picture.data.url);
      localStorage.setItem('id', response.id);
    }
  }

  logout = () =>{
    localStorage.clear()
    this.setState({
      auth :false
    })
  }

  render() {
    var numRows = this.state.categorie.length;
    var picture = localStorage.getItem('picture')
    var name = localStorage.getItem('name')
    let facebookData;
    this.state.auth ?
      facebookData = (
        <div className="">
          <img id="user_image" src={process.env.PUBLIC_URL +'/Avatar/' + picture} alt={name}/>
          <p style={{
            marginLeft: '10px'
          }}>Welcome {name}!</p>
        </div>
      ) :
      facebookData = (
        <FacebookLogin
        appId="316631749293090"
        autoLoad={false}
        fields="name,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook}/>
      );
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
              <img src={process.env.PUBLIC_URL +'/Avatar/' + picture} alt={this.state.name}/>
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
          <Link className="fb_button" to={{
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

        var redirection
        if(this.state.redirect){
         redirection = <Redirect to={{ pathname: '/myevents/profile' }}/>
        }

      var profile
      var logout 
      if(name !== null || name !== undefined ){
        profile = <Link to="/myevents/profile" className="active">MON PROFILE</Link>
        logout = <span onClick={this.logout}>Déconnexion</span>
      }

    return (
      <Fragment>
        {redirection}
        <div className="topnav">
          <div className="container_nav">    
            <div>
              {profile}
              {logout}
            </div>
            <div className="topnav-centered">
              <Link to="/" className="active">EVENT APP</Link>
            </div>
          </div>
          <div className="topnav-right">
            <>{facebookData}</>
          </div>
        </div>

        <div className="container">
          <div className="filters">
            <form onSubmit={this.handleSubmit}>
              <select id="perimetre" value={this.state.perimetre} onChange={this.handleChange}>
                <option value="5">Dans un rayon de 5 km</option>
                <option value="10">Dans un rayon de 10 km</option>
                <option value="15">Dans un rayon de 15 km</option>
                <option value="25">Dans un rayon de 25 km</option>
                <option value="50">Dans un rayon de 50 km</option>
                <option value="100">Dans un rayon de 100 km</option>
              </select>
              <select id="category" onChange={this.handleChange}>
                <option value={null}>Choisissez une catégorie</option>
                  {numRows > 0 ?
                    this.state.categorie.map((key, value) =>
                      <option key={value} value={key.id}>{parse(key.name)}</option>
                    ) : ""
                  }
              </select>
              <input type="text" id="lieu" minLength="3" maxLength="50" placeholder="Lieu..." onChange={this.handleChange}/><br></br>
              <input type="submit" id="button_filter" value="Filtrer"/>
            </form>
          </div>
          <h2 className="title_h2">Event(s) à venir</h2>
          <div className="list">
            <div>
              <center><BallBeat
                id="loader"
                color={'#FFFFFF'}
                loading={this.state.loading}
              /></center>
              {this.state.items.map(e => {
                let image =
                  e.image != null ? e.image.small.url : "https://weezevent.com/wp-content/uploads/2019/01/12145054/organiser-soiree.jpg";
                return (
                  <React.Fragment key ={parse(e.title)}>
                    <div className="article">
                      <div className="image_article">
                        <img src={image} width="200" height="200" alt="event_image" />
                      </div>
                      <div className="texte_article">
                        <h3>{parse(e.title)}</h3>
                        <span>{(e.start_time).substr(0, 10)}</span>
                        <span>{(e.city_name)}</span>
                        <Link to={{
                          pathname: '/myevents/event',
                          state: {
                            auth: this.state.auth,
                            id: this.state.id,
                            name: this.state.name,
                            picture: this.state.picture,
                            all: e,
                            image: {image},
                            date: (e.start_time).substr(0, 10)
                          }
                        }}>
                          <div className="more">En savoir plus</div>
                        </Link>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Home;
