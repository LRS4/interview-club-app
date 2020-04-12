import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar.component.jsx';
import QuestionsList from './components/Questions/questions-list.component.jsx';
import EditQuestion from './components/Questions/edit-question.component.jsx';
import CreateQuestion from './components/Questions/create-question.component.jsx';
import CreateUser from './components/Users/create-user.component.jsx';
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
