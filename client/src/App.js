import React from 'react';
import { Header, Footer } from './Components/Layouts'
import { Question, Questions} from './Components/Questions'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <div>
      <CssBaseline/>
      <Header/>
      
      <Container maxWidth="md">

         <Questions/>

      </Container>

      <Footer/>
    </div>
  );
}

export default App;