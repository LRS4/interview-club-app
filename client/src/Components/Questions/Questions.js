import React from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

// https://blog.logrocket.com/crud-with-node-graphql-react/#

const GET_QUESTIONS = gql`
  {
    questions {
      id
      text
      votes
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

  return data.questions.map(({ id, text, votes, difficulty, sectors, job_titles }) => ( 
    
    <List style={{ marginTop: 10 }} component="nav" aria-label="secondary mailbox folders">
      <ListItem button key={id}>
        <ListItemText primary={text} secondary={ votes + " others were asked this" } style={{ textAlign: "center" }} />
      </ListItem>
      <Divider />
    </List>
    
  ));
}

export default props => {
  return (
    <div>
        { GetAllQuestions() }
    </div>
  );
}
    