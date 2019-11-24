import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { Header, Footer } from './Components/Layouts'
import Questions from './Components/Questions'

const QuestionsQuery = gql`
  {
    questions {
      id
      text
      votes
      difficulty
      sectors
      job_titles
    }
  }
`;

function App() {
  return (
    <div>
      <Header/>
      
      <Questions/>

      <Footer/>
    </div>
  );
}

export default graphql(QuestionsQuery)(App);