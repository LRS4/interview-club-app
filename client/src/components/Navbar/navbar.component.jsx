import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './logout.component';
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import './navbar.component.css';

export class Navbar extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isOpen: false
        };
    }
      
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { isAuthenticated, user } = this.props;

        return (
            <MDBNavbar color="elegant-color" dark expand="md">
                <MDBNavbarBrand>
                    <Link to="/">
                        <img src="/logo.png" alt="Logo for Interview Club" className="navLogoImage" />
                    </Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBNavLink to='/'>
                                <strong>{ user ? `Welcome ${ user.username }` : '' }</strong>
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/about">About</MDBNavLink>
                        </MDBNavItem>
                        {   isAuthenticated ?
                            null :
                            <Fragment> 
                                <MDBNavItem>
                                    <MDBNavLink to="/register">Sign Up</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/login">Log In</MDBNavLink>
                                </MDBNavItem>
                            </Fragment>
                        } 
                        { 
                            this.props.isAuthenticated ?
                            <MDBNavItem>
                                <Logout />
                            </MDBNavItem>
                            : null
                        }
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, null)(Navbar);