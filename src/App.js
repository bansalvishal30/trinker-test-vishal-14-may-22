// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [token,setToken] = useState('');
  const [search,setSearch] = useState('');
  const [shares,setShares] = useState([]);

  useEffect(()=>{
    fetch('http://3.108.244.88:5000/api/user-access-token')
    .then(res=>res.json())
    .then(json=>{
      setToken(json.token);
    })
    .catch(err=>{
      console.log(err);
    })
  },[token]);

  function searchHandler(event){
    setSearch(event.target.value);
    fetch('http://3.108.244.88:5000/api/data?search_string='+search,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "user-access-token":token
      },
    })
    .then(res=>res.json())
    .then(data=>{
      setShares(data);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div>
      <input
      name="search"
      placeholder='Type to Search....'
      value={search}
      onChange={searchHandler} />
      <br/>
      <br/>
      <ul>
        {
          shares.map((item,index)=>(
            <li key={index}>
              <span className='share'>{item[0]}---</span>
              <span className='value1'>{item[1]}---</span>
              <span className='value2'>{item[2]}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
