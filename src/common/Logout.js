// LogoutButton.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear('refresh_token');
    localStorage.clear('access_token')
    console.clear();
    navigate('/login');

  },[])

};

export default LogoutButton;