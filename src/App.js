import React, { Component } from 'react';

import Home from './Home';
import OtherTime from './OtherTime';
import WhenIsSheGoing from './WhenIsSheGoing';
import './App.css';
import firebaseInst from './firebase';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'home',
      isSheGoing: null,
      isApproved: false,
    }
    this.onGoingResponseAction = this.onGoingResponseAction.bind(this);
    this.setCurrentView = this.setCurrentView.bind(this);
  }
  componentDidMount() {
    const db = firebaseInst.database();
    db.ref().child('date').on('value', snap => {
      if (snap.val()) {
        this.setState({ isApproved: snap.val().isApproved });
      }
    })
    console.log(this.state)
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
    console.log(this.state)
    switch (this.state.currentView) {
      case 'home':
        currentComponent = this.state.isApproved ? <WhenIsSheGoing setCurrentView={this.setCurrentView} /> : <Home onGoingResponseAction={this.onGoingResponseAction} />
        break;
      case 'other_time':
        currentComponent = <OtherTime onGoingResponseAction={this.onGoingResponseAction} />
        break;
      case 'shes_going':
        currentComponent = <WhenIsSheGoing setCurrentView={this.setCurrentView} />
        break;
      default:
        currentComponent =  this.state.isApproved ? <WhenIsSheGoing setCurrentView={this.setCurrentView} /> : <Home onGoingResponseAction={this.onGoingResponseAction} />
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
