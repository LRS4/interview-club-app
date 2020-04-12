import React from 'react';
import { Link } from 'react-router-dom';
import { 
    MDBCard, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBBadge
} from "mdbreact";
import './question-item.component.scss';

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
            <MDBCard color="white" text="black" className="card-body text-center" style={{ width: "100%", marginTop: "10px" }}>
                <MDBCardTitle>
                    {props.question.text}
                </MDBCardTitle>
                <div className="flex-row">
                    <MDBBadge>{props.question.sector}</MDBBadge>
                    <MDBBadge>{props.question.company}</MDBBadge>
                    <MDBBadge>{props.question.votes} others were asked this</MDBBadge>
                </div>
                <MDBCardText>
                    Added by {props.question.username}
                </MDBCardText>
                <div className="flex-row">
                    <MDBBtn className="actionBtn" size="md" color="pink">
                        <MDBIcon icon="list-alt"/>
                        View 12 Answers
                    </MDBBtn>
                    <MDBBtn className="actionBtn" size="md" color="pink">
                        <MDBIcon icon="plus" />
                        Add an answer
                    </MDBBtn>
                    <MDBBtn className="actionBtn" size="md" color="pink">
                        <MDBIcon icon="thumbs-up" />
                        I was asked this too!
                    </MDBBtn>
                </div>
            </MDBCard>
        </MDBCol>
        <MDBCol className="text-center" md="1">
            <div style={{ marginTop: "25px" }}>
                <Link to={ "/edit/" + props.question._id} >
                    <MDBBtn 
                        outline
                        size="sm" 
                        color="primary"
                    >
                            <MDBIcon icon="pen" />  
                    </MDBBtn>
                </Link>
                <MDBBtn
                    outline
                    size="sm"
                    onClick={() => { props.deleteQuestion(props.question._id) }} 
                    color="danger"
                >
                    <MDBIcon icon="trash" />
                    
                </MDBBtn>
            </div>
        </MDBCol>
    </MDBRow>
)

export default Question;