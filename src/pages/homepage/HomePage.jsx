import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Puzzles from "../../components/puzzles/Puzzles";
import Welcome from "../../components/welcome/Welcome";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../auth/firebase";

const HomePage = () => {
  const [user, setUser] = useState();
  const [isSignupComplete, setIsSignupComplete] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      <Header
        isLoggedIn={user ? true : false}
        setIsSignupComplete={setIsSignupComplete}
      />
      {user && isSignupComplete ? <Puzzles /> : <Welcome />}
    </div>
  );
};

export default HomePage;
