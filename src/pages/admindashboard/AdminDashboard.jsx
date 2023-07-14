import React, { useEffect, useState } from "react";
import "./admin-dashboard.css";
import { Button, Navbar, Nav, Modal } from "react-bootstrap";
import Points from "../../components/admindashboard/Points";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../auth/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import Login from '../../components/Login/Login'

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState("points");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminData = data.find((user) => user.email === "admin@gmail.com");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'admin@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "users"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setData(docs);
      } catch (error) {
        toast.message(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="admin-dashboard-root">
      <Loader isLoading={isLoading} />
      <Navbar bg="dark" variant="dark" className="admin-dashboard-header">
        <Navbar.Brand href="/admin" className="fs-3">
          Admin Dashboard
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="login-status">
            Logged in as: {adminData?.fullName}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <div className="columns-container">
        <Nav
          defaultActiveKey="/home"
          className="flex-column justify-content-between"
        >
          <div className="nav-links-container">
            <Nav.Link
              eventKey="link-1"
              onClick={() => setSelectedComponent("points")}
              active={selectedComponent === "points"}
            >
              Points
            </Nav.Link>
          </div>
          <Button variant="dark" onClick={handleLogout} className="w-50 ">
            Logout
          </Button>
        </Nav>
        <div className="component-container">
          {selectedComponent === "points" && isAdmin && <Points data={data} />}
        </div>
      </div>
      <Modal show={!isAdmin} centered backdrop="static">
        <Login />
      </Modal>
    </div>
  );
};

export default AdminDashboard;
