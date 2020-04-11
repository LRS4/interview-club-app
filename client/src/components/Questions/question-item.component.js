import React from 'react';
import { Link } from 'react-router-dom';
import { 
    MDBCard, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBBadge
} from "mdbreact";

/*
 * A functional React component opposed to a class based component is when you only
 * require a component that takes props (properties) and returns JSX.
 * 
 * Whereas a class based component has state and lifecycle methods.
 * 
 * This component contains props that are passed in via the questions-list component.
 * These are question, deleteQuestion (a method) and key (a unique reference for each) 
 */

const Question = (props) => (
    <MDBRow>
        <MDBCol md="1" />
        <MDBCol md="10">
            <MDBCard className="card-body " style={{ width: "100%", marginTop: "10px" }}>
                <MDBCardTitle>
                    {props.question.text}
                </MDBCardTitle>
                <MDBCardText>
                    <MDBCol sm="6"></MDBCol>
                        Added by {props.question.username}
                </MDBCardText>
                <div className="flex-row">
                    <MDBBtn color="primary">
                        <MDBIcon icon="eye" style={{ marginRight: "10px" }} />
                        View 12 Answers
                    </MDBBtn>
                    <Link to={ "/edit/" + props.question._id} >
                        <MDBBtn color="primary">
                            <MDBIcon icon="pen" style={{ marginRight: "10px" }} />
                            Edit
                        </MDBBtn>
                    </Link>
                    <MDBBtn
                        onClick={() => { props.deleteQuestion(props.question._id) }} 
                        color="danger"
                    >
                        <MDBIcon icon="trash" style={{ marginRight: "10px" }} />
                        Delete
                    </MDBBtn>
                </div>
            </MDBCard>
        </MDBCol>
        <MDBCol md="1" />
    </MDBRow>
)

export default Question;