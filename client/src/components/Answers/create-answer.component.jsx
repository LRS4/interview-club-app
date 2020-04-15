import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';
import '../Questions/create-question.css'
import Sectors from '../Questions/sectors.js';

export default class CreateAnswer extends Component {
    constructor(props) {
        super(props);

        // Way to bind functions to this if not using arrow functions
        // https://medium.com/@nikolalsvk/loosing-bind-this-in-react-8637ebf372cf
        // this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            question: "",
            username: "",
            text: "", 
            job: "",
            sector: "",
            company: "",
            users: [],
            sectors: [Sectors.sort((a, b) => a.localeCompare(b))][0]
        }
    }

    componentDidMount = () => {
        axios.get('/questions/' + this.props.match.params.qid)
            .then(response => {
                this.setState({
                    question: response.data.text
                })
            })
            

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
        })
    }

    onChangeCompany = (e) => {
        this.setState({
            company: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const answer = {
            username: this.state.username,
            text: this.state.text, 
            job: this.state.job,
            sector: this.state.sector,
            company: this.state.company
        }

        console.log(answer);

        await axios.post('/answers/add/' + this.props.match.params.qid, answer)
                .then(result => console.log(result.data))
                .catch(err => console.log("Error: " + err));

        window.location = '/answers/' + this.props.match.params.qid;
    }

    render() {
        return (
            <MDBContainer>
                <h3 className="text-center" style={{ marginTop: "10px" }}>
                    { this.state.question }
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
                            <MDBInput 
                                label="User" 
                                group type="text" 
                                validate
                                error="wrong" 
                                success="right"
                                onChange={this.onChangeUsername}
                                required
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