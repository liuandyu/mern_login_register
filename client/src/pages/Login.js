import React, {useState} from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
      e.preventDefault();
    
      const response = await fetch('http://localhost:8888/api/login', {
        headers: {
          'Content-Type':'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await response.json();

      if(data.user) {
        localStorage.setItem('token', data.user);
        alert('Login successful');
        window.location.href='/quote';
      } else {
        alert('Please check your username');
      }
      console.log(data);
  };

  return (
    <>
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={login}>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br /><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br /><br />
        <input type="submit" value="Login" className='btn'/>
      </form>
    </div>
    </>
  );
}

export default App;