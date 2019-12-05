import React from 'react';
import { Header, Footer } from './Components/Layouts'
import { Question, Questions} from './Components/Questions'
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div>
      <Header/>
      
      <Container maxWidth="md">

         <Questions/>

      </Container>

      <Footer/>
    </div>
  );
}

export default App;