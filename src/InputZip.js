import React, { Component } from 'react'

class InputZip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zipcode: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitZip(this.state.zipcode)
  }

  render() {
    return (
      <div>
        {/** This input uses the controlled component pattern */}
        <form onSubmit={e => this.handleSubmit(e)}>

        {/** 
        This pattern is used for input and other form elements 
        Set the value of the input to a value held in component state
        Set the value held in component state when a change occurs at the input 
        */}
        <label>Zip Code</label>
        <input 
          value={this.state.zipcode} 
          onChange={e => this.setState({ zipcode: e.target.value })}
          type="text" 
          pattern="(\d{5}([\-]\d{4})?)"
          placeholder="enter zip"
        />

        <button type="submit">Submit</button>

        </form>
      </div>
    )
  }
}

export default InputZip;
