import React from "react";
import "./t-and-c.css";

const TandC = () => {
  return (
    <div className="t-and-c-root">
      <p>TERMS AND CONDITIONS:</p>
      <div>1. The contest will be live for only 48 hours.</div>
      <div>2. You only have 2 attempts to solve all the puzzles.</div>
      <div>
        3. Your data will be collected for the contest leaderboard, and will not
        be shared with any external party.
      </div>
      <div>
        4. You can only register once with your email ID and phone number.
        Multiple registrations from the same IP address will not be counted.
      </div>
    </div>
  );
};

export default TandC;
