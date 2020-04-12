import React, { Component } from 'react';
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
            <MDBNavbar color="indigo darken-4" dark expand="md">
                <MDBNavbarBrand>
                    <img src="/logo.png" alt="Logo for Interview Club" className="navLogoImage" />
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/">About</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/create">Add Question</MDBNavLink>
                        </MDBNavItem>
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
                            <MDBNavLink to="/user">Sign Up</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        )
    }
}