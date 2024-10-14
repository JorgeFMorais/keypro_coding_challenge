import React, { useState } from 'react';
import { login, register } from '../api/authService.ts';

const Auth: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = () => {
    if (isLogin) {
      login(username, password).then((data) => {
        localStorage.setItem('token', data.token);
        window.location.reload(); // Refresh to update auth state
      });
    } else {
      register(username, password).then((data) => {
        localStorage.setItem('token', data.token);
        window.location.reload();
      });
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default Auth;
