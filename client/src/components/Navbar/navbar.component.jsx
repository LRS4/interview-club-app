import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline
} from "mdbreact";
import './navbar.component.css'

export default class Navbar extends Component {
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
                            <MDBFormInline waves>
                                <div className="md-form my-0">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                                </div>
                            </MDBFormInline>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/">About</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/user">Sign Up</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        )
    }
}