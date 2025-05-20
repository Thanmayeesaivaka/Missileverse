// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Tom from './pages/Tom';
import Login from './pages/Login';
import Register from './pages/Register';
import DetailPage from './pages/DetailPage';
import Subsystem from './pages/Subsystem';
import BrahMosPage from './pages/BrahMosPage';
import FutureTech from './pages/FutureTech';
import LaunchModePage from './pages/LaunchModePage';
import Range from './pages/Range';
import Propulsion from './pages/Propulsion';
import Warhead from './pages/Warhead';
import Guidance from './pages/Guidance';
import History from './pages/History';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Tom" element={<Tom />} />
      <Route path="/register" element={<Register />} />
      <Route path="/details/:topic" element={<DetailPage />} />
      <Route path="/Subsystem" element={<Subsystem />} />
      <Route path="/brahmos" element={<BrahMosPage />} />
      <Route path="/future" element={<FutureTech />} />
      <Route path="/tom/launchmode" element={<LaunchModePage />} />
      <Route path="/tom/range" element={<Range />} />
      <Route path="/tom/propulsion" element={<Propulsion />} />
      <Route path="/tom/warhead" element={<Warhead />} />
      <Route path="/tom/guidance" element={<Guidance />} />
      <Route path="/History" element={<History />} />
    </Routes>
  );
}

export default App;
