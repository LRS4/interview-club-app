import React, { Component } from 'react';

export default class CreateQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            text: "", 
            job: "",
            users: []
        }
    }

    componentDidMount() {
        this.setState({
            users: ['test user'],
            username: 'TestUser'
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    onChangeJob(e) {
        this.setState({
            job: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const question = {
            username: this.state.username,
            text: this.state.text, 
            job: this.state.job
        }

        console.log(question);

        window.location = '/';
    }

    render() {
        return (
            <div>
                <p>You are on the Create Question component! :)</p>
            </div>
        )
    }
}