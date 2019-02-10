
import React, { Component } from 'react';
import InputZip from './InputZip'

import './App.css';

import Weather from './Weather';

/**
 * This example illustrates a simple react project
 * that works with an external API.
 *
 * Take note of the comments they point common
 * problems you will need to solve with React.
 *
 * There are two ideas here
 * - Input/Controlled Component Pattern
 * - Conditionally Rendering components
 *
 * The project has an input field where a user will
 * input a zip code. It finds weather data for that
 * zip and displays it in a component.
 *
 * */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherdata: null
    }
  }

  submitZip(zip) {
    console.log(`Zip: ${zip}`)
    // load weather data
    const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    // Form an API request URL with the apikey and zip
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apikey}`;
    // Get data from the API with fetch
    fetch(url).then((res) => {
      // Handle the response stream as JSON
      return res.json();
    }).then((json) => {
      // If the request was successful assign the data to component state
      this.setState({ weatherData: json });
      // ! This needs better error checking here or at renderWeather()
      // It's possible to get a valid JSON response that is not weather
      // data, for example when a bad zip code entered.
    }).catch((err) => {
      // If there is no data
      this.setState({ weatherData: null }); // Clear the weather data we don't have any to display
      // Print an error to the console.
      console.log('-- Error fetching --');
      console.log(err.message);
      // You may want to display an error to the screen here. 
    });
  }


  render() {
    let weatherComponent = (<p> No data available</p>)
    if (this.weatherData != null) {
      weatherComponent = (<Weather weatherdata={this.state.weatherdata} />)
    }
    return (
      <div className="App">
        <InputZip submitZip={(zipcode) => this.submitZip(zipcode)} />
        {/* Display Weather component */}
        {weatherComponent}
      </div>
    );
  }
}

export default App;
