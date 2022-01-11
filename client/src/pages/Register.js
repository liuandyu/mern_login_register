import '../App.css';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const registerUser = async (e) => {
      e.preventDefault();
    
      const response = await fetch('http://localhost:8888/api/register', {
        headers: {
          'Content-Type':'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      const data = await response.json();

      if(data.status === 'ok') {
        history.push('/login');
      }
      console.log(data);
  };

  return (
    <>
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /> <br /><br/>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br /><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br /><br />
        <input type="submit" value="Register" className='btn'/>
      </form>
    </div>
    </>
  );
}

export default App;
