import React, {useState, useEffect} from 'react';
import './App.css';
import Loader from './Loader.js';
import RealApp from './RealApp.js';
import {getData} from './data';

function Error(props) {
  const {msg} = props;
  return (<div className="error"><div>{msg} 😢</div></div>);
}

export default function App (props) {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async() => {
      const {data, error} = await getData();
      setData(data);
      setError(error);
    })();
  }, []); // this [] means no dependencies so never need to rerun this effect

  return (
    <div className="App">
      <div className="header">gpustats.org</div>
      {
        error
          ? <Error msg={`could not fetch data: ${error}`} />
            : data 
              ? <RealApp data={data} />
              : <Loader />
      }
    </div>
  );
}

