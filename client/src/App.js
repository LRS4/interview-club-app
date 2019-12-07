import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Header, Footer } from './Components/Layouts'
import { Question, Questions} from './Components/Questions'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <div>
      <Router>
        <CssBaseline/>
        <Header/>
        
        <Container maxWidth="md">

          <Route exact path="/" component={ Questions } />
          <Route exact path="/question" component={ Question } />

        </Container>

        <Footer/>
      </Router>
    </div>
  );
}

export default App;