import React, { Component, Fragment } from 'react';
import { MDBNavLink } from "mdbreact";
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

export class Logout extends Component {
    render() {
        return (
            <Fragment>
                <MDBNavLink onClick={ this.props.logout } to='/'>
                    Logout
                </MDBNavLink>
            </Fragment>
        )
    }
}

export default connect(null, { logout })(Logout);