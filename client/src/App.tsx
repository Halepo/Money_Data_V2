import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './pages/login/login';
import Profile from './components/profile';
import logo from './logo.svg';
import './App.css';

import Home from './pages/home';

export default function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}
