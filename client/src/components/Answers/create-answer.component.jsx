import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAnswer } from './../../actions/questionsActions';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';
import '../Questions/create-question.css'
import Sectors from '../Questions/sectors.js';

class CreateAnswer extends Component {
    constructor(props) {
        super(props);

        // Way to bind functions to this if not using arrow functions
        // https://medium.com/@nikolalsvk/loosing-bind-this-in-react-8637ebf372cf
        // this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            text: "", 
            job: "",
            sector: "",
            company: "",
            sectors: [Sectors.sort((a, b) => a.localeCompare(b))][0]
        }
    }

    onChangeText = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    onChangeJob = (e) => {
        this.setState({
            job: e.target.value
        });
    }

    onChangeSector = (e) => {
        this.setState({
            sector: e.target.value
        })
    }

    onChangeCompany = (e) => {
        this.setState({
            company: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const answer = {
            username: this.props.username,
            text: this.state.text, 
            job: this.state.job,
            sector: this.state.sector,
            company: this.state.company
        }

        this.props.addAnswer(this.props.match.params.qid, answer);

        this.props.history.push(`/answers/${this.props.match.params.qid}`);
    }

    render() {
        return (
            this.props.question === undefined ? window.location = '/' :
            <MDBContainer>
                <h3 className="text-center" style={{ marginTop: "10px" }}>
                    { this.props.question.text }
                </h3>
                <MDBRow>
                    <MDBCol md="3" />
                    <MDBCol md="6">
                    <form onSubmit={this.onSubmit}>
                        <p className="h5 text-center mb-4"></p>
                        <div className="grey-text">
                            <MDBInput 
                                type="textarea" 
                                label="What was your answer? 2500 character limit" 
                                rows="5" 
                                onChange={this.onChangeText}
                                value={this.state.text}
                                required
                                maxlength="2500"
                            />
                            <MDBInput 
                                label="What was the job?" 
                                group type="text" 
                                validate error="wrong"
                                success="right" 
                                onChange={this.onChangeJob}
                                required
                                maxlength="60"
                                value={this.state.job}
                            />
                            <div className="select">
                                <select itemRef="userInput"
                                    className="select-text"
                                    value={this.state.sector}
                                    onChange={this.onChangeSector}
                                    required
                                >
                                    <option value="" disabled></option>
                                {
                                    this.state.sectors.map((sector) => {
                                        return (
                                            <option key={sector} value={sector}>{sector}</option>
                                        )
                                    })
                                }
                                </select>
                                <span className="select-highlight"></span>
                                <span className="select-bar"></span>
                                <label className="select-label">Choose sector</label>
                            </div>
                            <MDBInput 
                                label="Company (Optional)" 
                                group type="text" 
                                validate
                                error="wrong" 
                                success="right"
                                onChange={this.onChangeCompany}
                                maxlength="40"
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn type="submit" className="interviewClubBtn" color="pink">
                                Submit
                            </MDBBtn>
                        </div>
                    </form>
                    </MDBCol>
                    <MDBCol md="3" />
                </MDBRow>
            </MDBContainer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = String(ownProps.match.params.qid);
    return {
        question: state.questions.questions.find(question => question._id === id),
        username: state.auth.user.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAnswer: (qid, answer) => dispatch(addAnswer(qid, answer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAnswer);