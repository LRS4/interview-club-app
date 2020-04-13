import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Question from './question-item.component';
import axios from 'axios';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon } from 'mdbreact';
import './questions-list.component.scss'
require('dotenv').config();
var moment = require('moment');

export default class QuestionsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: []
        }
    }

    componentDidMount = () => {
        axios.get('/questions')
            .then(response => {
                let sortedQuestions = response.data.sort((a, b) => {
                    return (
                        moment().diff(moment(a.createdAt), 'minutes', false) -
                        moment().diff(moment(b.createdAt), 'minutes', false)
                    )
                });
                this.setState({
                    questions: sortedQuestions
                });
            })
            .catch(error => {
                console.log("Error: " + error);
            });
    }

    deleteQuestion = (id) => {
        axios.delete('/questions/' + id)
            .then(response => console.log(response))

        // Update state (_id is autogenerated by MongoDB)
        this.setState({
            questions: this.state.questions.filter(question => question._id !== id)
        })
    }

    /* 
    * This method will map the questions array and return a sub-component (Question)
    * for each question in the array
    */
    createQuestionPanels = () => {
        return this.state.questions.map(question => {
            return (
                <Question 
                    question={question}
                    deleteQuestion={this.deleteQuestion}
                    key={question._id}
                />
            )
        })
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="4" />
                    <MDBCol md="4">
                        <Link className="text-center" to="/create">
                            <MDBBtn className="interviewClubBtn" color="pink" size="md" style={{ width: "100%" }}>
                                <MDBIcon icon="rocket" style={{ marginRight: "10px" }} />
                                Add New Question
                            </MDBBtn>  
                        </Link>  
                    </MDBCol>
                    <MDBCol md="4" />
                </MDBRow>
                { this.createQuestionPanels() }  
            </MDBContainer>
        )
    }
}