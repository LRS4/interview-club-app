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

export default class extends Component {
  state = {
    open: false
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
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
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleToggle} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleToggle} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
  </Fragment>
  }
}