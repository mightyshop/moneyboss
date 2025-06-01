import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainApp from './components/MainApp';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/mylogin" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;