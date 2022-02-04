import React, { Component } from 'react';
import "./index.css";

const API_KEY = "296a3c1846ad0827bb1a96a7df2e54e9";
const DATA = "https://api.openweathermap.org/data/2.5/";
export default class App extends Component {
  state = {
    tempreature: "",
    city: "",
    country: "",
    humidity: "0",
    description: "",
    clouds:"0",
     wind:{
          speed:"0",
          deg:"0",
        },
    error: "",
  }
  search = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    
   
    const api = await fetch(
      `${DATA}weather?q=${city}&units=metric&APPID=${API_KEY}`
    )
    const data = await api.json();
    if (city) {
      this.setState({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        clouds:data.clouds.all,
        wind:{
          speed:data.wind.speed,
          deg:data.wind.deg,
        },
        error: "",
      })
    } else {
      this.setState({
        tempreature: "",
        city: "",
        country: "",
        humidity: "",
        dscription: "",
        clouds:"",
          wind:{
          speed:"",
          deg:"",
        },
        error: "please enter data",
      })
    }}
    
    datebuilder = (d) => {
      let months = [
        "january",
        "february",
        "march",
        "april",
        "june",
        "july",
        "augast",
        "septamber",
        "october",
        "november",
        "december",
      ];
      let days = [
        "sunday",
        "monday",
        "tuesday",
        "wenesday",
        "thursday",
        "friday",
        "saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    };

  render() {
    return  <div className="App">
    <main>
    <form onSubmit={this.search} className="search">
    
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          name="city"
         
        />
      
      <button class='btn-search '><i class="far fa-search"></i></button>
    </form>
     

      <div className="location-box">
        <div className="l">
          {this.state.city},{this.state.country}
        </div>

        <div className="date">{this.datebuilder(new Date())}</div>
      </div>

      <div className="weather-box">
        <div className="temp">{Math.round(this.state.tempreature)}ºC</div><br />
       
      </div>
       <div className="weather"><i class="fas fa-clouds fa-3x p-3"></i> {this.state.clouds} %<br />
          <i class="fas fa-humidity  fa-3x p-3"></i>  {this.state.humidity} %<br/>
         <i class="fas fa-wind-turbine  fa-3x p-3"></i>  <div className="d-inline-block">speed:  {this.state.wind.speed}<br/>
          deg:  {this.state.wind.deg}</div><br/>
          Des: {this.state.description}
          {this.state.error}
        </div>
    </main>
  </div>;
  }
}

