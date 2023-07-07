import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Puzzles from "../../components/puzzles/Puzzles";
import Welcome from "../../components/welcome/Welcome";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../auth/firebase";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn ? <Puzzles /> : <Welcome />}
    </div>
  );
};

export default HomePage;
