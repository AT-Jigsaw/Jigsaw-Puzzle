import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 5000
          }}
        >
          <Spinner animation="border" role="status"  style={{ width: "4rem", height: "4rem", borderWidth: 6, borderColor: '#ced4da', borderRightColor: 'transparent' }}>
   <span className="visually-hidden">Loading...</span>
</Spinner>
        </div>
      ) : null}
    </>
  );
};

export default Loader;
