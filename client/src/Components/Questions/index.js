import React from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const QuestionsQuery = gql`
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

function QuestionsResults() {
  const { loading, error, data } = useQuery(QuestionsQuery);
  console.log(data);
  if (loading) return <img style={{ marginLeft: 500 }} alt="Loading..." src="logo192.png"/>;
  if (error) return <p>Error :(</p>;

  return data.questions.map(({ id, text, votes, difficulty, sectors, job_titles }) => ( 
    
    <List component="nav" aria-label="secondary mailbox folders">
      <ListItem button key={id}>
        <ListItemText primary={text} secondary={ votes + " others were asked this" } style={{ textAlign: "center" }} />
      </ListItem>
      <Divider />
    </List>
    
  ));
}

export default props => 
    <div>
        {QuestionsResults()}
    </div>