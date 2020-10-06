import React, { Component } from 'react';

class App extends Component {
  
  constructor() {
    super()
    this.state = {
      price: 0,
    }

    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  setPrice(price) {
    this.setState({
      price: price,
    })
  }

  handlePriceChange(event) {
    let price = event.target.value
    console.log(this, event)
    this.setPrice(price)
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handlePriceChange}
          onClick={() => alert('KUY')}
        />
        <App2 price={this.state.price} />
      </div>
    )
  }
}

const App2 = ({ price }) => {
  return (
    <div>{price} baht</div>
  )
}

export default App;
