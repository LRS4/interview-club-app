import React from 'react';
import { Link } from 'react-router-dom';
import { 
    MDBCard, MDBCardTitle, MDBContainer, MDBBtn, MDBCardHeader, MDBCardBody, MDBIcon
} from "mdbreact";

const PageNotFound = (props) => (
    <MDBContainer className="text-center d-flex justify-content-center">
        <MDBCard style={{ width: "22rem", marginTop: "1rem"}}>
            <MDBCardHeader color="special-color">
                Oops!    
                <MDBIcon icon="frown" style={{ marginLeft: "10px" }}/>
            </MDBCardHeader>
            <MDBCardBody>
            <MDBCardTitle>That page doesn't exist!</MDBCardTitle>
            <Link to="/">
                <MDBBtn color="pink">Go Home</MDBBtn>
            </Link>
            </MDBCardBody>
        </MDBCard>
    </MDBContainer>
)

export default PageNotFound;