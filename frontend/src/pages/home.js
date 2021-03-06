import React, { Component } from 'react'
import Label from '../components/label';
import Input from '../components/input';
import Button from '../components/button';
import '../style.css'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            numbers: [1, 2, 3],
        }
    }

    render() {
        return (
            <div className="home-bg">
                <div className="home-panel">
                    <div className="max-width">
                        <Label>USERNAME</Label>
                    </div>
                    <Input
                        type="text"
                        value={this.state.username}
                        onChangeValue={username => this.setState({ username })}
                    />
                    <Button
                        label="LOGIN"
                        onClick={() => this.props.setPage("todo")}
                    />
                    <div>
                        {this.state.numbers.map((value, index) => {
                            return (
                                <div key={index}>
                                    <Label >{value}</Label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div> 
        )
    }
}

export default Home
