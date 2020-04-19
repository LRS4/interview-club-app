import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuestion } from './../../actions/questionsActions';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';
import './create-question.css';
import Sectors from './sectors';

class EditQuestions extends Component {
    constructor(props) {
        super(props);

        // Way to bind functions to this if not using arrow functions
        // https://medium.com/@nikolalsvk/loosing-bind-this-in-react-8637ebf372cf
        // this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            username: this.props.question ? String(this.props.question.username) : "",
            text: this.props.question ? String(this.props.question.text) : "", 
            job: this.props.question ? String(this.props.question.job) : "",
            sector: this.props.question ? String(this.props.question.sector) : "",
            company: this.props.question ? String(this.props.question.company) : "",
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

        const question = {
            username: this.state.username,
            text: this.state.text, 
            job: this.state.job,
            sector: this.state.sector,
            company: this.state.company
        }

        console.log(question);

        this.props.updateQuestion(
            this.props.question._id,
            question
        );

        this.props.history.push('/');
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="3" />
                    <MDBCol md="6">
                    <form onSubmit={this.onSubmit}>
                        <p className="h5 text-center mb-4"></p>
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
    let id = String(ownProps.match.params.id);
    return {
        question: state.questions.questions.find(question => question._id === id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQuestion: (id, question) => dispatch(updateQuestion(id, question))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestions);