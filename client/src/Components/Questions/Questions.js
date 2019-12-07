import React from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// https://blog.logrocket.com/crud-with-node-graphql-react/#

const GET_QUESTIONS = gql`
  {
    questions {
      id
      text
      votes
      date
      difficulty
      sectors
      job_titles
      answers {
        id
        text
        sector
        job_title
      }
    }
  }
`;  

function GetAllQuestions() {
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  console.log(data);
  if (loading) return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
      <CircularProgress />
    </div>
  );
  
  if (error) return <p>Error :(</p>;

  return ( 
    
    <List style={{ marginTop: 10 }} component="nav" aria-label="secondary mailbox folders">
      { data.questions.map(({ id, text, votes, date, difficulty, sectors, job_titles, answers }) =>
        <React.Fragment>
          <ListItem alignItems="flex-start" button key={id} component={props => <Link to={`/question/${id}`} {...props} />}>
            <ListItemText primary={text} secondary={
              <span>
                <Chip style={{ marginTop: 10 }} size="small" label={ votes + " others were asked this!" } />
                <Chip style={{ marginLeft: 5, marginTop: 10 }} size="small" label={ answers.length + " answers"} />    
                <Chip style={{ marginLeft: 5, marginTop: 10 }} size="small" label={ "Added " + new Date(parseInt(date)).toDateString().replace("GMT+0000 (Greenwich Mean Time)", "") } />      
              </span>
            } style={{ textAlign: "center" }} />
          </ListItem>
          <Divider />
        </React.Fragment>
      )}
    </List>
    
  );
}

export default props => {
  return (
    <div>
        { GetAllQuestions() }
    </div>
  );
}
    