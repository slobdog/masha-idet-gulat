import React, { Component } from 'react';

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
    this.setCurrentView = this.setCurrentView.bind(this);
  }
  setCurrentView(view) {
    this.setState({ currentView: view });
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
        currentComponent = <WhenIsSheGoing setCurrentView={this.setCurrentView} />
        break;
      default:
        currentComponent = <Home onGoingResponseAction={this.onGoingResponseAction} />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Маша идет гулять?</h1>
            { currentComponent }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
