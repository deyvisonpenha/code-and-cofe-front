import React from 'react';
import './App.css';
import Routes from './router';
import logo from './assets/logo.svg';

function App() {
  return (
    <div className="container">
      <img className="logo" src={logo} alt="CnC" />

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
