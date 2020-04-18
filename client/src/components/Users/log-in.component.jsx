import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            confirmEmail: "",
            password: "",
            confirmPassword: ""
        }
    }

    // https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        axios.post('/users/add', user)
            .then(result => console.log(result.data))
            .catch(err => console.log("Error: " + err));

        this.setState({
            username: "",
            email: "",
            confirmEmail: "",
            password: "",
            confirmPassword: ""
        })
    }

    render() {
        return (
            <MDBContainer>
                <br />
                <MDBRow>
                    <MDBCol md="3" />
                    <MDBCol md="6">
                    <form onSubmit={this.onSubmit}>
                        <p className="h5 text-center mb-4">Welcome back!</p>
                        <div className="grey-text">
                            <MDBInput 
                                label="Your username" 
                                icon="user" 
                                group type="text" 
                                validate error="wrong"
                                success="right" 
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                            />
                            <MDBInput 
                                label="Your password" 
                                icon="lock" 
                                group type="password" 
                                validate 
                                value={this.state.password}
                                onChange={(e) => {this.setState({password: e.target.value})}}
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn type="submit" className="interviewClubBtn" color="pink">Log In</MDBBtn>
                        </div>
                    </form>
                    </MDBCol>
                    <MDBCol md="3" />
                </MDBRow>
            </MDBContainer>
        )
    }
}