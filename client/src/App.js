import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar.component';
import QuestionsList from './components/questions-list.component';
import EditQuestion from './components/edit-question.component';
import CreateQuestion from './components/create-question.component';
import CreateUser from './components/create-user.component';
// import logo from './logo.svg';
// import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' exact component={QuestionsList} />
      <Route path='/edit/:id' exact component={EditQuestion} />
      <Route path='/create' exact component={CreateQuestion} />
      <Route path='/user' exact component={CreateUser} />
    </Router>
  );
}

export default App;
