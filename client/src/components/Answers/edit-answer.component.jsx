import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuestion } from './../../actions/questionsActions';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';
import './../Questions/create-question.css';
import Sectors from './../Questions/sectors';

class EditAnswer extends Component {
    constructor(props) {
        super(props);

        // Way to bind functions to this if not using arrow functions
        // https://medium.com/@nikolalsvk/loosing-bind-this-in-react-8637ebf372cf
        // this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            username: this.props.answer ? String(this.props.answer.username) : "",
            text: this.props.answer ? String(this.props.answer.text) : "", 
            job: this.props.answer ? String(this.props.answer.job) : "",
            sector: this.props.answer ? String(this.props.answer.sector) : "",
            company: this.props.answer ? String(this.props.answer.company) : "",
            users: [],
            sectors: [Sectors.sort((a, b) => a.localeCompare(b))][0]
        }
    }

    componentDidMount = () => {
        axios.get('/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username)
                    })
                }
            })
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
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
        });
    }

    onChangeCompany = (e) => {
        this.setState({
            company: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const answer = {
            username: this.state.username,
            text: this.state.text, 
            job: this.state.job,
            sector: this.state.sector,
            company: this.state.company
        }

        console.log(answer);

        this.props.updateQuestion(
            this.props.answer._id,
            answer
        );

        this.props.history.push('/');
    }

    render() {
        return (
            this.props.answer === undefined ? window.location = '/' :
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="3" />
                    <MDBCol md="6">
                    <form onSubmit={this.onSubmit}>
                        <p className="h5 text-center mb-4">ANSWER</p>
                        <div className="grey-text">
                            <MDBInput 
                                type="textarea" 
                                label="What was the question?" 
                                rows="5" 
                                onChange={this.onChangeText}
                                value={this.state.text}
                            />
                            <MDBInput 
                                label="What was the job?" 
                                group type="text" 
                                validate error="wrong"
                                success="right" 
                                onChange={this.onChangeJob}
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
                                value={this.state.company}
                                onChange={this.onChangeCompany}
                            />
                            <MDBInput 
                                label="User" 
                                group type="text" 
                                validate
                                error="wrong" 
                                success="right"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn className="interviewClubBtn" type="submit" color="pink">
                                Save Changes
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
    let qid = String(ownProps.match.params.qid);
    let id = String(ownProps.match.params.id);
    let question = state.questions.questions.find(question => question._id === qid)
    if (question) {
        return {
            answer: question.answers.find(answer => answer._id === id)
        }
    } else {
        return window.location = '/';
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQuestion: (id, question) => dispatch(updateQuestion(id, question))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAnswer);