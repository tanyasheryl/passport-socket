import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
//import logo from './logo.svg';
//import './App.css';
const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const Landing = () => <h2>Landing</h2>;
class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/success" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={Landing} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
