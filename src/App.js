import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/homepage/HomePage';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admindashboard/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
