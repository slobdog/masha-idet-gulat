import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import OtherTime from './OtherTime';
import WhenIsSheGoing from './WhenIsSheGoing';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'home',
      isSheGoing: null,
    }
    this.onGoingResponseAction = this.onGoingResponseAction.bind(this);
  }
  onGoingResponseAction(answer) {
    this.setState({ isSheGoing: answer });
    if (!answer) {
      this.setState({ currentView: 'other_time' });
    } else {
      this.setState({ currentView: 'shes_going' });
    }
  }
  render() {
    let currentComponent = '';
    switch (this.state.currentView) {
      case 'home':
        currentComponent = <Home onGoingResponseAction={this.onGoingResponseAction} />
        break;
      case 'other_time':
        currentComponent = <OtherTime onGoingResponseAction={this.onGoingResponseAction} />
        break;
      case 'shes_going':
        currentComponent = <WhenIsSheGoing />
        break;
      default:
        currentComponent = <Home onGoingResponseAction={this.onGoingResponseAction} />
    }
    return (
      <div className="container">
        <h1 className="text-center">Маша идет гулять?</h1>
        { currentComponent }
      </div>
    );
  }
}

export default App;
