import React from 'react';
import Home from './home/Home';
import Login from './login/Login';

const Protected = () => {
  const isAuthenticated = localStorage.getItem("token");
  
  return isAuthenticated ? <Home /> : <Login />;
};

export default Protected;
