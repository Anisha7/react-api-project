import React, { Component } from 'react';

class Weather extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          inputValue: '',     // Used to hold value entered in the input field
          weatherData: null,  // Used to hold data loaded from the weather API
        }
      }
    
      handleSubmit(e) {
        e.preventDefault()
        // ! Get your own API key ! 
        const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
        // Get the zip from the input
        const zip = this.state.inputValue
        // Form an API request URL with the apikey and zip
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apikey}`
        // Get data from the API with fetch
        fetch(url).then(res => {
          // Handle the response stream as JSON
          return res.json()
        }).then((json) => {
          // If the request was successful assign the data to component state
          this.setState({ weatherData: json })
          // ! This needs better error checking here or at renderWeather() 
          // It's possible to get a valid JSON response that is not weather 
          // data, for example when a bad zip code entered.
        }).catch((err) => {
          // If there is no data 
          this.setState({ weatherData: null }) // Clear the weather data we don't have any to display
          // Print an error to the console. 
          console.log('-- Error fetching --')
          console.log(err.message)
          // You may want to display an error to the screen here. 
        })
      }
    
      render() {
        // This method returns undefined or a JSX component
        if (this.state.weatherData === null) {
          // If there is no data return undefined
          return undefined
        }
    
        /* 
        This next step needs another level of error checking. It's 
        possible to get a JSON response for an invalid zip in which 
        case the step below fails. 
        */ 
        console.log(this.state.weatherData)
        // Take the weather data apart to more easily populate the component
        const { main, description, icon } = this.state.weatherData.weather[0]
        const { temp, pressure, humidity, temp_min, temp_max } = this.state.weatherData.main 
        
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
        )
      }
    
}

export default Weather;