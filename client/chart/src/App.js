import React, { Component } from 'react';
import ChartBuilder from './ChartBuilder';
import './App.css';

class App extends Component {
  render() {
      return <div className="App">
          <header className="App-header">
              <p>
                  Web-3i - Industrial IoT Visualisation Platform
              </p>
          </header>
          <ChartBuilder/>
      </div>;
  }
}

export default App;
