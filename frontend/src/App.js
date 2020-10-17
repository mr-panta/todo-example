import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component { // stateful component
  
  constructor() {
    super()
    this.state = {
      price: 100,
    }
    // this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  // handlePriceChange(event) {
  //   let price = event.target.value
  //   this.setState({
  //     price: price
  //   })
  // }

  render() {
    return (
      <div>      
        <PriceInput
          setPrice={newPrice => this.setState({ price: newPrice })}
          price={this.state.price}
        />
        <PriceBox
          currency="บาท"
          price={this.state.price}
        />
      </div>
    )
  }
}

const PriceInput = (props) => {
  return (
    <input
      type="number"
      onChange={event => props.setPrice(event.target.value)}
      value={props.price}
    />
  )
}

const PriceBox = (props) => { // stateless component
  return (
    <div>{props.price} {props.currency}</div>
  )
}

export default App;
