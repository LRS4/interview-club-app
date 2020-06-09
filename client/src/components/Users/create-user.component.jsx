import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert } from 'mdbreact';

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            confirmEmail: "",
            password: "",
            confirmPassword: "",
            msg: null
        }
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, return to home page
        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    checkEmailsMatch = () => {
        return this.state.email === this.state.confirmEmail;
    }

    checkPasswordsMatch = () => {
        return this.state.password === this.state.confirmPassword;
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, email, password } = this.state;

        // Create user object
        const newUser = {
            username,
            email,
            password
        }; 

        console.log(newUser);

        // Client side checks
        if (!this.checkEmailsMatch()) {
            this.setState({ msg: 'Email does not match.' });
            return;
        } else if (!this.checkPasswordsMatch()) {
            this.setState({ msg: 'Passwords do not match. '});
            return;
        } else {
            // Attempt to register user
            this.props.register(newUser);
        }
    }

    render() {
        return (
            <MDBContainer>
                <br />
                <MDBRow>
                    <MDBCol md="3" />
                    <MDBCol md="6">
                    {
                        this.state.msg ?
                        <MDBAlert color="danger" dismiss onClose={() => this.props.clearErrors()}>
                            { this.state.msg }
                        </MDBAlert> :
                        null
                    }
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
                            <MDBBtn type="submit" className="interviewClubBtn" color="pink">Register</MDBBtn>
                        </div>
                    </form>
                    </MDBCol>
                    <MDBCol md="3" />
                </MDBRow>
            </MDBContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = (dispatch) => ({
    register: (newUser) => dispatch(register(newUser)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);