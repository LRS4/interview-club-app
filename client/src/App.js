import React from 'react';
import logo from './logo.png';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

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

function Questions() {
  const { loading, error, data } = useQuery(QuestionsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return data.questions.map(({ id, text, votes, difficulty, sectors, job_titles }) => (
    <div key={id}>
      <p>
        {text} {votes} {difficulty} {sectors} {job_titles}
      </p>
    </div>
  ));
}

function App() {
  return (
    <div>
      <img src={logo} alt="Interview Club logo"/>
    </div>,
    Questions()
  );
}

export default (App);
