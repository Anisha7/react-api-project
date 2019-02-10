import React, { Component } from 'react';
import './App.css';

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {// Used to hold value entered in the input field
      weatherdata: props.weatherdata || null, // Used to hold data loaded from the weather API
    };
  }

  render() {
    // This method returns undefined or a JSX component
    if (this.state.weatherdata === null) {
      // If there is no data return undefined
      return null;
    }

    /*
    This next step needs another level of error checking. It's
    possible to get a JSON response for an invalid zip in which
    case the step below fails.
    */
    console.log(this.state.weatherdata)
    // Take the weather data apart to more easily populate the component
    const { main, description, icon } = this.state.weatherdata.weather[0];
    const { temp, pressure, humidity, temp_min, temp_max } = this.state.weatherdata.main;
        
    return (
        <div>
          <div>Title: {main}</div>
          <div>Desc: {description}</div>
          <div>Icon: {icon}</div>
          <div>Temp: {temp}</div>
          <div>Pressure: {pressure}</div>
          <div>Humidity: {humidity}</div>
          <div>Temp Min: {temp_min} Max:{temp_max}</div>
        </div>
    );
  }
}

export default Weather;
