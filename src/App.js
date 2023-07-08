import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/homepage/HomePage';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminDashboard from './pages/admindashboard/AdminDashboard';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './auth/firebase';
import { ToastContainer } from 'react-toastify';

function App() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'admin@gmail.com') {
        setIsAdmin(true);
        navigate('/admin')
      } else {
        setIsAdmin(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
      </Routes>
    </div>
  );
}

export default App;
