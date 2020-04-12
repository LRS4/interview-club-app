import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';

export default class CreateUser extends Component {
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

        axios.post(`${process.env.REACT_APP_LOCAL_API_ENDPOINT}/users/add`, user)
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
                        <p className="h5 text-center mb-4">Sign up</p>
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
                                label="Your email" 
                                icon="envelope" 
                                group type="email" 
                                validate error="wrong"
                                success="right" 
                                value={this.state.email}
                                // setting state inline
                                onChange={(e) => {this.setState({email: e.target.value})}}
                            />
                            <MDBInput 
                                label="Confirm your email" 
                                icon="exclamation-triangle" 
                                group type="text" 
                                validate
                                error="wrong" 
                                success="right" 
                                value={this.state.confirmEmail}
                                onChange={(e) => {this.setState({confirmEmail: e.target.value})}}
                            />
                            <MDBInput 
                                label="Your password" 
                                icon="lock" 
                                group type="password" 
                                validate 
                                value={this.state.password}
                                onChange={(e) => {this.setState({password: e.target.value})}}
                            />
                            <MDBInput 
                                label="Confirm your password" 
                                icon="exclamation-triangle" 
                                group type="password" 
                                validate
                                error="wrong" 
                                success="right" 
                                value={this.state.confirmPassword}
                                onChange={(e) => {this.setState({confirmPassword: e.target.value})}}
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn type="submit" color="primary">Register</MDBBtn>
                        </div>
                    </form>
                    </MDBCol>
                    <MDBCol md="3" />
                </MDBRow>
            </MDBContainer>
        )
    }
}