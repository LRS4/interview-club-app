import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { upvoteQuestion } from '../../actions/questionsActions';
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

/*
 * Using redux selectors to access the state within the store
 * https://react-redux.js.org/next/api/hooks#useselector
 * https://react-redux.js.org/api/hooks#usedispatch
 */

const Question = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    return (
    <MDBRow>
        <MDBCol md="1" />
        <MDBCol md="10">
            <MDBCard color="white" text="black" className="card-body text-center" style={{ width: "100%", marginTop: "10px" }}>
                { 
                    user !== null ?
                        isAuthenticated && user.username === props.question.username ?
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
                        : null
                    : null
                }
                <MDBCardTitle>
                    {props.question.text}
                </MDBCardTitle>
                <div className="flex-row">
                    <MDBBadge>{props.question.job}</MDBBadge>
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
                                    props.question.answers.length === 1 
                                    ? ' Answer' : ' Answers'
                                }
                            </MDBBtn>
                        </Link>
                    }
                    <Link to={ "/create/" + props.question._id} question={props.question.text}>
                        <MDBBtn className="actionBtn" size="md" color="pink">
                            <MDBIcon icon="plus" />
                            Add an answer
                        </MDBBtn>
                    </Link>
                    {
                        user !== null ?
                            props.question.voters.includes(user._id) ?
                                <MDBBtn disabled className="actionBtn" size="md" color="unique">
                                    <MDBIcon icon="thumbs-up" />
                                    I was asked this too!
                                </MDBBtn>
                            :   <MDBBtn className="actionBtn" size="md" color="pink" onClick={() => dispatch(upvoteQuestion(props.question._id, user._id))}>
                                    <MDBIcon icon="thumbs-up" />
                                    I was asked this too!
                                </MDBBtn>
                        : null
                    }
                </div>
            </MDBCard>
        </MDBCol>
        <MDBCol className="text-center" md="1" />
    </MDBRow>
    )
}

export default Question;