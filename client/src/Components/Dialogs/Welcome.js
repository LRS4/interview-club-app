import React, { Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddIcon from '@material-ui/icons/Add';

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

    <IconButton aria-label="search" onClick={this.handleToggle} color="inherit">
      <HelpOutlineIcon />
    </IconButton>

    <Dialog open={open} onClose={this.handleToggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Welcome to Interview Club!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rules are simple. You don't talk about Interview Club, and if it's your first time to Interview Club... You have to post a question
            or an answer!<br/><br/>
            The whole point to this is to learn from others, help others and become more confident. No one likes interviews, and I couldn't
            find a good place to find good answers to good questions - so I made it. No accounts, no nonsense, completely anonymous depending how 
            much you're willing to share! You're limited to 300 words - the standard 1-3 minute response to a competency question. So make it count!<br/><br/>
            The add <AddIcon/> icon at the bottom let's you add a question to the club. Clicking a question will take you to all the answers for that question - 
            and allow you to add a new answer for it with <PostAddIcon/><br/><br/>
            Features coming soon:<br/>
            <ul>
              <li>Search for questions by sector</li>
              <li>Filter answers by job title, sector and date</li>
              <li>Rate an answer - and the best will move to the top!</li>
              <li>Upvote a question - I was asked this!</li>
              <li>Many more...</li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleToggle} color="primary">
            I'm ready
          </Button>
        </DialogActions>
      </Dialog>
  </Fragment>
  }
}