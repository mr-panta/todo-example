import React, { Component } from 'react'
import Home from './pages/home'

class App extends Component { // stateful component
  
  constructor() {
    super()
    this.state = {
      page: "home",
    }

    this.setPage = this.setPage.bind(this);
  }

  setPage(page) {
    this.setState({ page })
  }

  render() {
    return (
      <div>      
        {this.state.page === "home" && <Home setPage={this.setPage} />}
      </div>
    )
  }
}

export default App
