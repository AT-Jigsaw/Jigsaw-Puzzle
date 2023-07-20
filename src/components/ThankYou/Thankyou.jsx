import React from "react";
import "./thankyou.css";

const ThankYou = () => {
  const isMobileScreen = window.innerWidth < 1024;
  return (
    <div className="thank-you-container">
      <div className="images-container">
        <img
          src={isMobileScreen ? require("../../assets/thank-you-img.png") : require("../../assets/thank-you-img-small.png")}
          alt="all-puzzles"
          height={isMobileScreen ? 180 : 640}
          width={isMobileScreen ? 300 : 400}
        />
      </div>
      <div className="thankyou-container">
        <div className="top-line">
          <div className="top-line1"></div>
          <div className="top-line2"></div>
          <div className="top-line3"></div>
        </div>
        <div className="thankyou-txt">
          THANK YOU FOR PARTICIPATING! MORE DETAILS ARE COMING YOUR WAY SOON..
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

export default ThankYou;
