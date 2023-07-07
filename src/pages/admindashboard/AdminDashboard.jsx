import React, { useState } from "react";
import "./admin-dashboard.css";
import { Button, Navbar, Nav } from "react-bootstrap";
import Points from "../../components/admindashboard/Points";

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("points");

  const handleLogout = () => {};

  return (
    <div className="admin-dashboard-root">
      <Navbar bg="dark" variant="dark" className="admin-dashboard-header">
        <Navbar.Brand href="/admin" className="fs-3">
          Admin Dashboard
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="login-status">Logged in as: {'Test'}</Navbar.Text>
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
          {selectedComponent === "points" && <Points />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
