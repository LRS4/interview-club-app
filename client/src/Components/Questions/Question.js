import React from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';

const GET_QUESTION = gql`
  query Question($id: ID!) {
    question(id: $id) {
      text
      votes
      date
      sectors
      job_titles
      answers {
        text
        upvotes
        date
        sector
        job_title
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

function GetOneQuestion(questionId) {
  const classes = useStyles(); 
  const { loading, error, data } = useQuery(GET_QUESTION, { variables: { id: questionId }});
  if (loading) return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
        <CircularProgress />
    </div>
  );
  if (error) return <p>Error :(</p>;

  // get all answers
  const answers = []
  const answers_count = data.question.answers.length

  for (let i = 0; i < answers_count; i++) {
    let upvotes = data.question.answers[i].upvotes + " likes";
    let date = "Added " + new Date(parseInt(data.question.answers[i].date));
    answers.push(<div style={{ textAlign: "center" }}>
                <Paper style={{ textAlign: "center" }} className={classes.root}>
                  <Typography component="p">
                    { data.question.answers[i].text }
                  </Typography>
                  <Chip size="small" label={ upvotes } />
                  <Chip size="small" label={ data.question.answers[i].job_title } />
                  <Chip size="small" label={ data.question.answers[i].sector } />
                  <Chip size="small" label={ date.replace("GMT+0000 (Greenwich Mean Time)", "") } />
                </Paper>
                <Tooltip title="Add an answer">
                  <IconButton aria-label="Add question">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View details">
                  <IconButton aria-label="vote">
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Good answer!">
                  <IconButton aria-label="vote">
                    <ThumbUpAltOutlinedIcon />
                  </IconButton>
                </Tooltip>
                </div>
                );
  }

  const questionVotes = data.question.votes + " others were asked this";
  const questionDate = "Added " + new Date(parseInt(data.question.date));

  return (
    <div>
      <Paper style={{ textAlign: "center", marginTop: 35 }} className={classes.root}>
        <Typography variant="h5" component="h3">
          { data.question.text }
        </Typography>
        <Chip size="small" label={ questionVotes } />
        <Chip size="small" label={ questionDate.replace("GMT+0000 (Greenwich Mean Time)", "") } />
      </Paper>
      <div style={{ textAlign: "center" }}>
        <Tooltip title="Previous question">
          <IconButton aria-label="previous">
            <SkipPreviousIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add question">
          <IconButton aria-label="Add question">
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View details">
          <IconButton aria-label="vote">
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="I was asked this!">
          <IconButton aria-label="vote">
            <ThumbUpAltOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Next question">
          <IconButton aria-label="Next question">
            <SkipNextIcon />
          </IconButton>
        </Tooltip>
      </div>
      { answers }
    </div>
  )
}

export default props => {
    return (
        <div>
            { GetOneQuestion("5dd7f2ac4e99f647e41e8fcc") }
        </div>
    );
}

    