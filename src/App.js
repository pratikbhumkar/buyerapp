import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import Home from './components/Home'
import AddItemToEvent from './components/AddItemToEvent';
import Register from './components/Register';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Wrapper>
            <Route exact path="/" component={Login} />
            <Route exact path="/registerUser" component={Register} />
            <Navbar />
            <Route exact path="/home" component={Home} />
            <Route exact path="/additemtoevent" component={AddItemToEvent} />
          </Wrapper>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
