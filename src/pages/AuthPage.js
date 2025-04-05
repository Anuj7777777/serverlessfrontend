import React, { useState } from 'react';
import { useAuth } from '../utils/auth';
import Login from '../components/Login';
import Register from '../components/Register';
import '../styles/auth.css';

const AuthPage = () => {
  const { token } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (token) {
    return <div>You are already logged in.</div>;
  }

  return (
    <div className="auth-page">
      {isLogin ? <Login /> : <Register />}
      <button 
        onClick={() => setIsLogin(!isLogin)} 
        className="toggle-auth"
      >
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default AuthPage;