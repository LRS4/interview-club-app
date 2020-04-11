import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import './create-question.css'

export default class CreateQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            text: "", 
            job: "",
            users: []
        }
    }

    componentDidMount() {
        this.setState({
            users: ['test user'],
            username: 'TestUser',
            sectors: ['Administrative', 'Technology', 'Retail', 'Banking', 'Engineering', 'Public Services']
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    onChangeJob(e) {
        this.setState({
            job: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const question = {
            username: this.state.username,
            text: this.state.text, 
            job: this.state.job
        }

        console.log(question);

        window.location = '/';
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
                            <MDBInput type="textarea" label="What was the question?" rows="5" />
                            <MDBInput label="What was the job?" group type="text" validate error="wrong"
                                success="right" />
                            <div className="select">
                                <select className="select-text" required>
                                    <option value="" disabled selected></option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </select>
                                <span className="select-highlight"></span>
                                <span className="select-bar"></span>
                                <label className="select-label">Choose sector</label>
                            </div>
                            <MDBInput label="User" group type="text" validate
                                error="wrong" success="right" />
                        </div>
                        <div className="text-center">
                        <MDBBtn color="primary">Submit</MDBBtn>
                        </div>
                    </form>
                    </MDBCol>
                    <MDBCol md="3" />
                </MDBRow>
            </MDBContainer>
        )
    }
}