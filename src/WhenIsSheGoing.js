import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import firebaseInst from './firebase';

import 'react-datepicker/dist/react-datepicker.css';

class WhenIsSheGoing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isApproved: false,
      date: moment().format(),
      time: '',
      place: '',
      late: true,
      lateTime: '',
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.handleLateChange = this.handleLateChange.bind(this);
    this.handleLateTimeChange = this.handleLateTimeChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleApproveChange = this.handleApproveChange.bind(this);
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    const db = firebaseInst.database();
    db.ref().on('value', snap => {
      if (snap.val()) {
        console.log(snap.val().date)
        this.setState(snap.val().date)
      }
      this.setState({ isLoading: false });
    })
  }
  handleDateChange(date) {
    this.setState({ date: date.format() })
  }
  handlePlaceChange(place) {
    this.setState({ place: place.target.value });
  }
  handleTimeChange(time) {
    this.setState({ time: time.target.value });
  }
  handleLateChange(willBeLate) {
    const isLate = 'checkbox' ? willBeLate.target.checked : willBeLate.target.value;
    this.setState({ late: isLate })
  }
  handleLateTimeChange(timeWillBeLate) {
    this.setState({ lateTime: timeWillBeLate.target.value })
  }
  handleApproveChange(val) {
    const isApproved = 'checkbox' ? val.target.checked : val.target.value;
    this.setState({ isApproved: isApproved })
  }
  onFormSubmit(ev) {
    ev.preventDefault();
    console.log(this.state)
    this.setState({ isLoading: true })
    firebaseInst.database().ref().set({ date: this.state })
      .then(() => {
        this.setState({ isLoading: false });
        this.props.setCurrentView('home');
      })
  }
  render() {
    const lateTime = (
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">На сколько?</label>
        <input className="form-control" value={this.state.lateTime} onChange={this.handleLateTimeChange} />
      </div>
    );
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Тебе удобно в этот день?</label>
          <DatePicker dateFormat="DD/MM/YYYY" minDate={moment()} onChange={this.handleDateChange} selected={moment(this.state.date)} locale="en-gb" />
          <small className="form-text text-muted">Если нет - можешь выбрать другой день</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">В какое время?</label>
          <input className="form-control" value={this.state.time} onChange={this.handleTimeChange} />
          <small className="form-text text-muted">Тоже самое со временем</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Куда пойдем</label>
          <input className="form-control" value={this.state.place} onChange={this.handlePlaceChange} />
          <small className="form-text text-muted">Если не нравится место - выбери другое</small>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" defaultChecked={this.state.late} value={this.state.late} onChange={this.handleLateChange} />
            Ты опоздаешь?
          </label>
        </div>
        { this.state.late ? lateTime : null }
        <div className="form-check">
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" defaultChecked={this.state.isApproved} value={this.state.isApproved} onChange={this.handleApproveChange} />
            Вроде все правильно :)
          </label>
        </div>
        <button type="submit" className="btn btn-success btn-block has-spinner" disabled={this.state.isLoading}>
          <span className="spinner"><i className="icon-spin icon-refresh"></i></span>
          Маша идет гулять!
        </button>
      </form>
    );
  }
};

export default WhenIsSheGoing;
