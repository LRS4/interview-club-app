import React, { Component } from 'react';

export default class CreateQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username = "",
            text = "", 
            job = ""
        }
    }

    render() {
        return (
            <div>
                <p>You are on the Create Question component! :)</p>
            </div>
        )
    }
}