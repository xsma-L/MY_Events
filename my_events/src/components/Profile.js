import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./Events.css";
import "./Profile.css";

export class Profile extends Component {
  constructor(props) {
    super(props);
    //TODO definir les props
    this.state = {
      picture: null,
      id:null,
      name:null,
      avatar: null,
      avatar_data: null,
      avatar_input: null,
      bio: null,
      bio_input: null,
      pseudo:null,
      pseudo_input: null,
      email: null,
      email_input: null,
      registed: false,
      redirect : false
    };
  }

  componentDidMount(){
    //TODO Verififcation connexion
    var data = localStorage.getItem('name');
    if(data !== undefined || data !== null){
      var data_picture = localStorage.getItem('picture')
      if(data_picture === 'https://scontent.xx.fbcdn.net/v/t31.0-1/cp0/c15.0.50.50a/p50x50/10733713_10150004552801937_4553731092814901385_o.jpg?_nc_cat=1&_nc_sid=12b3be&_nc_oc=AQmY4afJ88ZJqO0xzWtF6ykhYvPHUDdJ5PrCxj__R_5_GJx75rw9shegSPQZxj5kD1E&_nc_ht=scontent.xx&oh=e2c0cbce6ddf99a7a7a8c7b4a57b38ff&oe=5E9816D4'){
        this.setState({
          picture: 'facebook.jpg',
          name: localStorage.getItem('name'),
          id: localStorage.getItem('id'),
          bio: localStorage.getItem('bio'),
        })  
      }else{
        this.setState({
          picture: localStorage.getItem('picture'),
          name: localStorage.getItem('name'),
          id: localStorage.getItem('id'),
          bio: localStorage.getItem('bio')
        }) 
      }
      axios.post('https://127.0.0.1:8000/verify', {
        'id_facebook': localStorage.getItem('id')
      })
        .then(data => {
          var output = data.data.message
          if(output === 'registed'){
            this.setState({
              registed: true
            })
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    else{
      this.setState({ redirect: true })
    }
  }

  bio = (event) =>{
    //TODO modification bio
    event.preventDefault();
    var button = document.getElementById('bio_modify')
    var bio_input = document.getElementById('bio_input')
    var submit = document.getElementById('submit')
    button.style.display = 'none'
    bio_input.style.display = 'block'
    submit.style.display = 'block'
  }

  picture = (event) =>{
    //TODO modification avatar
    event.preventDefault();
    var pic_input = document.getElementById('avatar_input')
    var button = document.getElementById('pic_modify')
    var submit = document.getElementById('submit')
    button.style.display = 'none'
    pic_input.style.display = 'block'
    submit.style.display='block'
  }

  pseudo = (event) =>{
    //TODO modification pseudo
    event.preventDefault();
    var pic_input = document.getElementById('pseudo_input')
    var button = document.getElementById('pseudo_modify')
    var submit = document.getElementById('submit')
    button.style.display = 'none'
    pic_input.style.display = 'block'
    submit.style.display = 'block'
  }

  email = (event) =>{
    //TODO modification email
    event.preventDefault();
    var pic_input = document.getElementById('email_input')
    var button = document.getElementById('email_modify')
    var submit = document.getElementById('submit')
    button.style.display = 'none'
    pic_input.style.display = 'block'
    submit.style.display = 'block'
  }

  handleChange = (event) => {
    //TODO onchange des inputs
    if(event.target.id === 'avatar_input'){
      console.log(event.target.files[0].name)
      this.setState({
        [event.target.id]: event.target.files[0].name,
        avatar_data: event.target.files[0]
      })
    }else{
      this.setState({
        [event.target.id]: event.target.value})
      }
    }
    
    handleSubmit = (event) => {
      // TODO submit du form
      event.preventDefault();
      var submit = document.getElementById('submit')
    if(this.state.avatar_data !== null){
        const data = new FormData()
        data.append('file', this.state.avatar_data)
        axios.post("http://localhost:8001/upload", data, {
        }).then(res => {
          console.log(res.statusText)
       })
      console.log(this.state.avatar_input)
       localStorage.setItem('picture', this.state.avatar_input)
       this.setState({
         picture: this.state.avatar_input
       })
    }

    if(this.state.bio_input !== null){
      this.setState({
        bio: this.state.bio_input
      })
      localStorage.setItem('bio', this.state.bio_input)
      var button = document.getElementById('bio_modify')
      var bio_input = document.getElementById('bio_input')
      button.style.display = 'block'
      bio_input.style.display = 'none'
      submit.style.display = 'none'
    }

    if(this.state.pseudo_input !== null){
      this.setState({
        name: this.state.pseudo_input
      })
      localStorage.setItem('name', this.state.pseudo_input)
      var pic_input = document.getElementById('pseudo_input')
      var button_2 = document.getElementById('pseudo_modify')
      button_2.style.display = 'block'
      pic_input.style.display = 'none'
      submit.style.display = 'none'
    }

    if(this.state.email_input !== null){
      this.setState({
        email: this.state.email_input
      })
      localStorage.setItem('email', this.state.email_input)
      var pic_input_3 = document.getElementById('email_input')
      var button_3 = document.getElementById('email_modify')
      button_3.style.display = 'block'
      pic_input_3.style.display = 'none'
      submit.style.display = 'none'
    }
  }

  logout = () =>{
    // TODO deconnexion
    localStorage.clear()
    this.setState({
      redirect: true
    })
  }

  render() {
    var redirection
    var data = localStorage.getItem('name');

    localStorage.setItem('auth', true);
    let facebookData;
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
          <button className="user_infos">
            <img src={this.state.picture} alt={this.state.name}/>
            <p>{this.state.name}</p>
          </button>
        </Link>
      );
      
    if(this.state.redirect){
      redirection = <Redirect to={{ pathname: '/' }}/>
    }

    let Bio = {
      data: null,
      input: null
    }
    if(this.state.bio === null){
      Bio.data = <p>Vous n'avez pas encore de bio</p>
      Bio.input = <button id="bio_modify" onClick={this.bio}>Ajouter une bio</button> 
    }else{
      Bio.data = <p>{this.state.bio}</p>
      Bio.input = <button id="bio_modify" onClick={this.bio}>Modifier ma bio</button> 
    }

    let Picture = {
      input: null
    }
    Picture.input = <button id="pic_modify" onClick={this.picture}>Modifier ma photo</button> 

    let Pseudo = {
      data: null,
      input: null
    }
    if(this.state.name === null){
      Pseudo.data = <p>{this.state.name}</p>
      Pseudo.input = <button id="pseudo_modify" onClick={this.pseudo}>Modifier mon pseudo</button> 
    }else{
      Pseudo.data = <p>{this.state.name}</p>
      Pseudo.input = <button id="pseudo_modify" onClick={this.pseudo}>Modifier mon pseudo</button> 
    }

    let Email = {
      data: null,
      input: null
    }
    if(this.state.email === null){
      Email.data = <p>Vous n'avez pas encore d'email</p>
      Email.input = <button id="email_modify" onClick={this.email}>Ajouter mon email</button> 
    }else{
      Email.data = <p>{this.state.email}</p>
      Email.input = <button id="email_modify" onClick={this.email}>Modifier mon email</button> 
    }

    var logout 
      if(data !== null || data !== undefined){
        // profile = <Link to="/myevents/profile" className="active">MON PROFILE</Link>
        logout = <span onClick={this.logout}>Déconnexion</span>
      }

    return (
      <Fragment>
        {redirection}
          <div className="topnav">
            <div className="topnav-centered">
              <Link to="/" className="active">EVENT APP</Link>
            </div>
            {logout}
            <div className="topnav-right">
              <>{facebookData}</>
            </div>
          </div>
          <div className="container3">
            <center><h1>Mon Profil</h1>
            <div className="edit_zone">
              <form onSubmit={this.handleSubmit}>
                <div className="profile_pic">
                  <h3>Mon Avatar</h3>
                  <div className="pics">
                    <img alt='profile' src={process.env.PUBLIC_URL +'/Avatar/' + this.state.picture} />
                  </div>
                  {Picture.input}
                  <input type="file"
                    id="avatar_input" onChange={this.handleChange}
                    accept="image/png, image/jpeg">
                  </input><br></br><br></br>
                </div>
                <div className="profile_data">
                  {Pseudo.data}{Pseudo.input}
                  <input id="pseudo_input" type="text" onChange={this.handleChange}
                    placeholder="Veuillez-entrer votre pseudo">
                  </input><br></br><br></br>
                  {Email.data}{Email.input}
                  <input id="email_input" type="text" onChange={this.handleChange}
                    placeholder="Veuillez-entrez votre email">
                  </input><br></br><br></br>
                </div>
                <div className="bio_area">
                  {Bio.data}{Bio.input}
                  <textarea id="bio_input" rows="5" cols="50" onChange={this.handleChange}
                    placeholder="Ecrivez votre bio ici...">
                  </textarea><br></br><br></br>
                </div>
                <button id="submit" type="submit">Valider</button>
              </form>
            </div></center>
          </div>
        </Fragment>
    )
  }
}

export default Profile;
