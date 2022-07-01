import './App.css';
import React, { useState } from 'react';
import axios from "axios";

function App() {
  const [data, setdata] = useState('');
  const [res, setres] = useState([]);
  const updata = async (e) => {
    setdata(e);
    await axios.post('http://localhost:3001/get', {
      data: e
    })
      .then(function (response) {
        setres(response.data.data)
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <input onChange={(e) => updata(e.target.value)} />
        <p>{data}</p>
        {res.length ?
          <>
            {res.map(function (item, i) {
              return (
                <p>{item.data}</p>
              )
            })}
          </>
          : ''}

      </header>
    </div>
  );
}

export default App;
