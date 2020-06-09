import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';
import './create-question.css'
import Sectors from './sectors.js';
import { connect } from 'react-redux';
import { addQuestion } from './../../actions/questionsActions';

class CreateQuestion extends Component {
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
            users: [],
            sectors: [Sectors.sort((a, b) => a.localeCompare(b))][0]
        }
    }

    componentDidMount = () => {
        axios.get('/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
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

        const question = {
            username: this.props.username,
            text: this.state.text, 
            job: this.state.job,
            sector: this.state.sector,
            company: this.state.company
        }

        this.props.addQuestion(question);

        // Moved to redux action creator
        // await axios.post('/questions/add', question)
        //         .then(result => console.log(result.data))
        //         .catch(err => console.log("Error: " + err));

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
                                label="What was the question? 300 character limit" 
                                rows="5" 
                                onChange={this.onChangeText}
                                value={this.state.text}
                                required
                                maxLength="300"
                            />
                            <MDBInput 
                                label="What was the job?" 
                                group type="text" 
                                validate error="wrong"
                                success="right" 
                                onChange={this.onChangeJob}
                                value={this.state.job}
                                required
                                maxLength="60"
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
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn className="interviewClubBtn" type="submit" color="pink">
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

const mapStateToProps = (state) => ({
    username: state.auth.user.username,
    error: state.error
});

const mapDispatchToProps = (dispatch) => {
    return {
        addQuestion: (question) => dispatch(addQuestion(question))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);