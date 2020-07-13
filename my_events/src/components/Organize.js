import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { BallBeat } from 'react-pure-loaders';
import parse from 'html-react-parser';
// import axios from "axios";
import "./Events.css";

export class Organize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event : [],
      loading: true
    };
}

componentDidMount(){
  if(this.props.location.state !== undefined){
    this.setState({
      event: this.props.location.state.info,
      loading: false
    })
  }
}

render(){
  const e = this.state.event.e
  console.log(e)
  let image
  let description

  if(e !== undefined){
    if(e.image != null){
      image = e.image.medium.url
    }else{
      image =  "https://weezevent.com/wp-content/uploads/2019/01/12145054/organiser-soiree.jpg";
    }

    if(e.description != null){
      description = e.description
    }else{
      description = 'Aucune description'
    }
  }
    return (
      <Fragment>
          <div className="topnav">
              <div className="topnav-centered">
              <Link to="/" className="active">EVENT APP</Link>
              </div>
              <div className="topnav-right">
              <Link to="/"><img src="https://img.icons8.com/ios-glyphs/30/000000/user-male.png" alt="login_img" height="17px"/></Link>
              </div>
          </div>
          <BallBeat
            id="loader"
            color={'#FFFFFF'}
            loading={this.state.loading}
          />
         { e !== undefined ?
            <div key ={parse(e.title)}>
            <div className="article">
              <div className="image_article">
                <img src={image} width="200" height="200" alt="event_image" />
              </div>
              <div className="texte_article">
                <h3>{parse(e.title)}</h3>
                <span>{e.venue_address}, {e.city_name}</span><br /><br />
                <span>Date: {parse(e.start_time)}</span><br />
                <span>{parse(description)}</span><br />
              </div>
            </div>
          </div> : ''}
          <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">

                                </div>
                            </div>
                            <div className="card-footer">
                                    <input type="text" placeholder="Username" className="form-control"/>
                                    <br/>
                                    <input type="text" placeholder="Message" className="form-control"/>
                                    <br/>
                                    <button className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </Fragment>
    )
  }
}

export default Organize;
