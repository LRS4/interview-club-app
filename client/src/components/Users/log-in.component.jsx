import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert } from 'mdbreact';

export class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            msg: null
        }
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
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

    onSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        const user = {
            username, 
            password
        }

        // Attempt to login
        this.props.login(user);
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

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => dispatch(login(username, password)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);