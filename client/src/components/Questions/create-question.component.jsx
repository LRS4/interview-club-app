import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';
import './create-question.css'

export default class CreateQuestion extends Component {
    constructor(props) {
        super(props);

        // Way to bind functions to this if not using arrow functions
        // https://medium.com/@nikolalsvk/loosing-bind-this-in-react-8637ebf372cf
        // this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            username: "",
            text: "", 
            job: "",
            users: [],
            sectors: []
        }
    }

    componentDidMount = () => {
        axios.get('/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    onChangeText = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    onChangeJob = (e) => {
        this.setState({
            job: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const question = {
            username: this.state.username,
            text: this.state.text, 
            job: this.state.job
        }

        console.log(question);

        await axios.post('/questions/add', question)
                .then(result => console.log(result.data))
                .catch(err => console.log("Error: " + err));

        window.location = '/';
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="3" />
                    <MDBCol md="6">
                    <form onSubmit={this.onSubmit}>
                        <p className="h5 text-center mb-4"></p>
                        <div className="grey-text">
                            <MDBInput 
                                type="textarea" 
                                label="What was the question?" 
                                rows="5" 
                                onChange={this.onChangeText}
                                value={this.state.text}
                            />
                            <MDBInput 
                                label="What was the job?" 
                                group type="text" 
                                validate error="wrong"
                                success="right" 
                                onChange={this.onChangeJob}
                                value={this.state.job}
                            />
                            <div className="select">
                                <select itemRef="userInput"
                                    className="select-text"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    required
                                >
                                    <option value="" disabled></option>
                                {
                                    this.state.users.map(user => {
                                        return (
                                            <option key={user} value={user}>{user}</option>
                                        )
                                    })
                                }
                                </select>
                                <span className="select-highlight"></span>
                                <span className="select-bar"></span>
                                <label className="select-label">Choose sector</label>
                            </div>
                            <MDBInput label="User" group type="text" validate
                                error="wrong" success="right" />
                        </div>
                        <div className="text-center">
                            <MDBBtn type="submit" color="primary">
                                Submit
                            </MDBBtn>
                        </div>
                    </form>
                    </MDBCol>
                    <MDBCol md="3" />
                </MDBRow>
            </MDBContainer>
        )
    }
}