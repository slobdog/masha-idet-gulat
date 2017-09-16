import React from 'react';

const OtherTime = ({ onGoingResponseAction }) => (
  <div className="other_time">
    <div className="row">
      <div className="col-md-12 text-center">
        <img src="./other_time.jpg" alt="Sad dog" />
      </div>
    </div>
    <div>
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-danger btn-block" onClick={() => onGoingResponseAction(true)}>Ладно, я передумала</button>
        </div>
      </div>
    </div>
  </div>
);

export default OtherTime;
