import React from 'react';
import { Link } from 'react-router-dom';
import { 
    MDBCard, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBBadge
} from "mdbreact";
import './question-item.component.scss';
var moment = require('moment');

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
                <div className="flex-row float-right">
                    <span className="float-right editDataBtn">
                        <MDBIcon
                            icon='trash-alt'
                            size='1x'
                            style={{ cursor: 'pointer', color: "#2E3B55" }}
                            onClick={() => { props.deleteQuestion(props.question._id) }}
                        />                  
                    </span>
                    <Link to={ "/edit/" + props.question._id} >
                        <span className="float-right editDataBtn">
                            <MDBIcon
                                icon='pen'
                                size='1x'
                                style={{ cursor: 'pointer', color: "#2E3B55", marginRight: "10px" }}
                            />
                        </span>
                    </Link>
                </div>
                <MDBCardTitle>
                    {props.question.text}
                </MDBCardTitle>
                <div className="flex-row">
                    <MDBBadge>{props.question.sector}</MDBBadge>
                    <MDBBadge>{props.question.company}</MDBBadge>
                    <MDBBadge>{props.question.votes} others were asked this</MDBBadge>
                </div>
                <MDBCardText>
                    Added by {props.question.username} {moment(props.question.createdAt).fromNow()}
                </MDBCardText>
                <div className="flex-row">
                    {props.question.answers.length > 0 &&
                        <Link to={ "/answers/" + props.question._id} >
                            <MDBBtn className="actionBtn" size="md" color="pink">
                                <MDBIcon icon="list-alt"/>
                                View { props.question.answers.length } 
                                { 
                                    props.question.answers.length == 1 
                                    ? ' Answer' : ' Answers'
                                }
                            </MDBBtn>
                        </Link>
                    }
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
        <MDBCol className="text-center" md="1" />
    </MDBRow>
)

export default Question;