import React, { Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default class extends Component {
  state = {
    open: false
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleSubmit = () => {
    // TODO: form validation
    var formQuestion = document.getElementById('newQuestion').value;
    var formJobTitle = document.getElementById('questionJobTitle').value;
    var formSector = document.getElementById('sector-select-id').innerHTML;
    var formCompetency = document.getElementById('competency-select-id').innerHTML;

    this.setState({
      open: false
    })
  }

  render() {
    const { open } = this.state

    return <Fragment>
    <Tooltip title="Add a new question">
      <Fab color="secondary" aria-label="add" onClick={this.handleToggle} style={{position: 'absolute', zIndex: 1, top: -30, left: 0, right: 0, margin: '0 auto', backgroundColor: '#EB67A3'}}>
          <AddIcon />
      </Fab>
    </Tooltip>
    

    <Dialog open={open} onClose={this.handleToggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the form to add a new question.
          </DialogContentText>
          <TextField
            id="newQuestion"
            margin="dense"
            label="What was the interview question?"
            placeholder="Give me an example of a time you had to solve a problem?"
            multiline
            fullWidth
            required
          />
          <TextField
            id="questionJobTitle"
            margin="dense"
            label="What was the job title?"
            placeholder="Office Manager"
            fullWidth
            required
          />
          <br/>
          <br/>
          <FormControl fullWidth required>
            <InputLabel>What sector was the job in?</InputLabel>
            <Select
              labelId="sector-select"
              id="sector-select-id"
            >
              <MenuItem value={'finance'}>Accountancy, banking and finance</MenuItem>
              <MenuItem value={'management'}>Business and management</MenuItem>
              <MenuItem value={'voluntary'}>Charity and voluntary</MenuItem>
              <MenuItem value={'creativeArts'}>Creative arts and design</MenuItem>
              <MenuItem value={'energy'}>Energy and utilities</MenuItem>
              <MenuItem value={'engineering'}>Engineering and manufacturing</MenuItem>
              <MenuItem value={'agricultureEnv'}>Environment and agriculture</MenuItem>
              <MenuItem value={'healthcare'}>Healthcare</MenuItem>
              <MenuItem value={'hospitality'}>Hospitality and events</MenuItem>
              <MenuItem value={'informationTech'}>Information Technology</MenuItem>
              <MenuItem value={'law'}>Law</MenuItem>
              <MenuItem value={'lawEnforcement'}>Law enforcement and security</MenuItem>
              <MenuItem value={'leisure'}>Leisure, sport and tourism</MenuItem>
              <MenuItem value={'marketing'}>Marketing, advertising and PR</MenuItem>
              <MenuItem value={'property'}>Property and construction</MenuItem>
              <MenuItem value={'publicServices'}>Public services and administration</MenuItem>
              <MenuItem value={'recruitment'}>Recruitment and HR</MenuItem>
              <MenuItem value={'retail'}>Retail</MenuItem>
              <MenuItem value={'sales'}>Sales</MenuItem>
              <MenuItem value={'science'}>Science and pharmaceuticals</MenuItem>
              <MenuItem value={'socialCare'}>Social care</MenuItem>
              <MenuItem value={'education'}>Teaching and education</MenuItem>
              <MenuItem value={'transport'}>Transport and logistics</MenuItem>
            </Select>
          </FormControl>
          <br/>
          <br/>
          <FormControl fullWidth required>
            <InputLabel>What competency was this question about?</InputLabel>
            <Select
              labelId="sector-select"
              id="competency-select-id"
            >
              <MenuItem value={'teamwork'}>Teamwork</MenuItem>
              <MenuItem value={'communication'}>Communication</MenuItem>
              <MenuItem value={'leadership'}>Leadership</MenuItem>
              <MenuItem value={'decision'}>Decision Making</MenuItem>
              <MenuItem value={'problem-solving'}>Problem Solving</MenuItem>
              <MenuItem value={'organisation'}>Organisation</MenuItem>
              <MenuItem value={'technical'}>Technical</MenuItem>
              <MenuItem value={'analytical'}>Analytical</MenuItem>
              <MenuItem value={'influencing'}>Influencing</MenuItem>
              <MenuItem value={'time-management'}>Time Management</MenuItem>
              <MenuItem value={'change-management'}>Change Management</MenuItem>
              <MenuItem value={'customer-service'}>Customer Service</MenuItem>
              <MenuItem value={'innovation'}>Innovation</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleToggle} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  </Fragment>
  }
}