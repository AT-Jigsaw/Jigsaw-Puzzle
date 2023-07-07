import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/homepage/HomePage';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admindashboard/AdminDashboard';
import { useState } from 'react';

function App() {
  const [isAdmin, setIsAdmin] = useState(true)
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
      </Routes>
    </div>
  );
}

export default App;
