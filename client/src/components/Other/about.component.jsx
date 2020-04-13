import React from 'react';
import { 
    MDBCard, MDBRow, MDBContainer, MDBCol
} from "mdbreact";

const About = () => {
    return ( 
       <MDBContainer className="d-flex justify-content-center">
            <MDBCard style={{ width: "25rem", marginTop: "5rem"}}>
                <MDBRow className="d-flex justify-content-center" style={{ marginTop: "10px" }}>
                    <h3>Welcome to Interview Club</h3>
                </MDBRow>
                <MDBRow className="d-flex justify-content-center" style={{ marginTop: "5px" }}>
                    <img src="/logo.png" alt="Logo for Interview Club" className="navLogoImage" />
                </MDBRow>
                <MDBRow>
                    <MDBCol md="1" />
                    <MDBCol md="10">
                        <p style={{ marginTop: "20px" }}>
                            Rules are simple. You don't talk about Interview Club, and if it's your first time to
                            Interview Club... You have to post a question or an answer!
                        </p>
                        <p>
                            The whole point to this is to learn from others, help others and become more confident. No one likes interviews, and I couldn't
                            find a good place to find good answers to good questions - so I made it. You're limited to 300 words - the standard 1-3 minute 
                            response to a competency question. So make it count!
                        </p>
                    </MDBCol>
                    <MDBCol md="1" />
                </MDBRow>
            </MDBCard>
       </MDBContainer> 
    );
}
 
export default About;