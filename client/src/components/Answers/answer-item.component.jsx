import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { upvoteAnswer } from '../../actions/questionsActions';
import { 
    MDBCard, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBBadge
} from "mdbreact";
import '../Questions/question-item.component.scss';
var moment = require('moment');

/*
 * A functional React component opposed to a class based component is when you only
 * require a component that takes props (properties) and returns JSX.
 * 
 * Whereas a class based component has state and lifecycle methods.
 * 
 * This component contains props that are passed in via the answers-list component.
 * These are answer, deleteAnswer (a method) and key (a unique reference for each) 
 */

const Answer = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    return (
        <MDBRow>
            <MDBCol md="1" />
            <MDBCol md="10">
                <MDBCard color="white" text="black" className="card-body text-center" style={{ width: "100%", marginTop: "10px" }}>
                { 
                    user !== null ?
                        isAuthenticated && user.username === props.answer.username ?
                        <div className="flex-row float-right">
                            <span className="float-right editDataBtn">
                                <MDBIcon
                                    icon='trash-alt'
                                    size='1x'
                                    style={{ cursor: 'pointer', color: "#2E3B55" }}
                                    onClick={() => { props.deleteAnswer(props.answer._id) }}
                                />                  
                            </span>
                            <Link to={ "/edit/" + props.qid + "/" + props.answer._id} >
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
                    <MDBCardTitle style={{ fontSize: "18px" }}>
                        {props.answer.text}
                    </MDBCardTitle>
                    <div className="flex-row">
                        <MDBBadge>{props.answer.sector}</MDBBadge>
                        <MDBBadge>{props.answer.company}</MDBBadge>
                        <MDBBadge>{props.answer.votes} votes</MDBBadge>
                    </div>
                    <MDBCardText>
                        Added by {props.answer.username} {moment(props.answer.createdAt).fromNow()}
                    </MDBCardText>
                    <div className="flex-row">
                        {
                        user !== null ?
                            props.answer.voters.includes(user._id) ?
                                <MDBBtn disabled className="actionBtn" size="md" color="unique">
                                    <MDBIcon icon="thumbs-up" />
                                    This answer helped!
                                </MDBBtn>
                            :   <MDBBtn className="actionBtn" size="md" color="pink" onClick={() => dispatch(upvoteAnswer(props.qid, props.answer._id, user._id))}>
                                    <MDBIcon icon="thumbs-up" />
                                    This answer helped!
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

export default Answer;