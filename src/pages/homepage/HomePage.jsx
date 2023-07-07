import React, { useState } from "react";
import Header from "../../components/header/Header";
import Puzzles from "../../components/puzzles/Puzzles";
import Welcome from "../../components/welcome/Welcome";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Header isLoggedIn={isLoggedIn}/>
      {isLoggedIn ? <Puzzles /> : <Welcome />}
    </div>
  );
};

export default HomePage;
