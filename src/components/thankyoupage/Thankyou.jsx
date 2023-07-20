import React from "react";
import "./thankyou.css";

const Thankyou = () => {
  return (
    <div className="container">
      <div className="images-container">
        <img
          src={require("../../assets/puzzle-1.jpg")}
          height="500px"
          width="400px"
        />
      </div>
      <div className="thankyou-container">
        <div className="top-line">
          <div className="top-line1"></div>
          <div className="top-line2"></div>
          <div className="top-line3"></div>
        </div>
        <div className="thankyou-txt">
          <p>
            THANK YOU
            <br /> FOR PARTICIPATING! <br />
            MORE DETAILS
            <br /> ARE COMING <br />
            YOUR <br /> WAY SOON..
          </p>
        </div>
        <div className="bottom-line">
          <div className="bottom-line1"></div>
          <div className="bottom-line2"></div>
          <div className="bottom-line3"></div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
