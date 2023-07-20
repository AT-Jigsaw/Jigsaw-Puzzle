import axios from "axios";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { db } from "../../auth/firebase";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "./additional-details.css";
import Loader from "../loader/Loader";

const AdditionalDetails = ({
  timer,
  setAdditionalDetailsModalOpen,
  setShowThankYouModal,
}) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.get("https://api.ipify.org?format=json");
      const q = query(
        collection(db, "users"),
        where("ipAddress", "==", data.ip)
      );
      const userSnap = await getDocs(q);

      if (userSnap.size) {
        return toast.error("You have already completed the puzzle.");
      }
      const uid = uuidv4();
      if (!isEmailValid(email)) {
        setIsLoading(false);
        return toast.error("Please enter a valid email.");
      }
      await setDoc(doc(db, "users", uid), {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        ipAddress: data.ip,
        timer: timer,
      });
      setAdditionalDetailsModalOpen(false);
      setShowThankYouModal(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="additional-details-root">
      <Loader isLoading={isLoading} />
      <table className="additional-details-table">
        <tbody>
          <tr>
            <td>
              <span className="additional-details-label">Full Name</span>
            </td>
            <td>
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                placeholder="Enter Full Name"
                className="additional-details-input"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span className="additional-details-label">Email</span>
            </td>
            <td>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Email Address"
                className="additional-details-input"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span className="additional-details-label">Phone Number</span>
            </td>
            <td>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                placeholder="Enter Phone Number"
                className="additional-details-input"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Button
        className="additional-details-button"
        variant="success"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default AdditionalDetails;
