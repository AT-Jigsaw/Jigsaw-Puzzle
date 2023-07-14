import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./start-now.css";
import axios from "axios";
import { db } from "../../auth/firebase";
import { toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loader from '../loader/Loader';

const StartNow = ({ setShowStartModal }) => {
    const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
        setIsLoading(true);
      const { data } = await axios.get("https://api.ipify.org?format=json");
      const q = query(
        collection(db, "users"),
        where("ipAddress", "==", data.ip)
      );
      const userSnap = await getDocs(q);

      if (userSnap.size) {
        toast.error("You have already completed the puzzle.");
      } else {
        setShowStartModal(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
        setIsLoading(false)
    }
  };

  return (
    <div className="start-now-root">
        <Loader isLoading={isLoading} />
      <div className="start-now-text">Click below to start</div>
      <Button
        variant="success"
        onClick={handleClick}
        className="start-now-button"
      >
        Start
      </Button>
    </div>
  );
};

export default StartNow;
