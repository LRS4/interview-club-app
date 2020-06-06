import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/navbar.component.jsx';
import About from './components/Other/about.component.jsx';
import QuestionsList from './components/Questions/questions-list.component.jsx';
import EditQuestion from './components/Questions/edit-question.component.jsx';
import CreateQuestion from './components/Questions/create-question.component.jsx';
import AnswersList from './components/Answers/answers-list.component.jsx';
import EditAnswer from './components/Answers/edit-answer.component.jsx';
import CreateAnswer from './components/Answers/create-answer.component.jsx';
import CreateUser from './components/Users/create-user.component.jsx';
import SignIn from './components/Users/log-in.component.jsx';
import PageNotFound from './components/Other/page-not-found.component.jsx';
import store from './store';
import { loadUser } from './actions/authActions';
// import logo from './logo.svg';
// import './App.css';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={QuestionsList} />
          <Route path='/about' exact component={About} />
          <Route path='/edit/:id' exact component={EditQuestion} />
          <Route path='/create' exact component={CreateQuestion} />
          <Route path='/answers/:qid' exact component={AnswersList} />
          <Route path='/edit/:qid/:id' exact component={EditAnswer} />
          <Route path='/create/:qid' exact component={CreateAnswer} />
          <Route path='/user' exact component={CreateUser} />
          <Route path='/login' exact component={SignIn} />
          <Route component={PageNotFound}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
