import React from 'react';

const Home = (props) => {
  return (
    <div>
      <button className="btn btn-success btn-block" onClick={() => props.onGoingResponseAction(true)}>Понятно, что да!</button>
      <button className="btn btn-danger btn-block" onClick={() => props.onGoingResponseAction(false)}>Может в другой раз?</button>
    </div>
  )
};

export default Home;
