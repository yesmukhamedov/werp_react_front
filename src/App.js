import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainContainer from './components/MainContainer/MainContainer';

class App extends Component {
  render() {
    const token = localStorage.getItem('token');
    // If we have a token, consider the user to be signed in
    if(token) {
      return (
        <div className="App">
          <div className="wrapper">
            <Header />                     
            <MainContainer>
              {this.props.children}
            </MainContainer>   
          </div>
        </div>
      );
    } else {
      return (          
        <div >
            {this.props.children}
        </div>
      );            
    } 
  }
}

export default App;
