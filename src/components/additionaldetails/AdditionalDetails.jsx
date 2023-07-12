import axios from "axios";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { auth, db } from "../../auth/firebase";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./additional-details.css";
import Loader from "../loader/Loader";

const AdditionalDetails = ({timer, setAdditionalDetailsModalOpen}) => {
  const [user, setUser] = useState();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isFullNameDisabled, setIsFullNameDisabled] = useState(false);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const [isPhoneNumberDisabled, setIsPhoneNumberDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveToDatabase = async (timer) => {
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    try {
      setIsLoading(true);
      await setDoc(docRef, { timer }, { merge: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        try {
          setIsLoading(true);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.fullName) {
              setFullName(data.fullName);
              setIsFullNameDisabled(true);
            }
            if (data.email) {
              setEmail(data.email);
              setIsEmailDisabled(true);
            }
            if (data.phoneNumber) {
              setPhoneNumber(data.phoneNumber);
              setIsPhoneNumberDisabled(true);
            }
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await saveToDatabase(timer);
      const { data } = await axios.get("https://api.ipify.org?format=json");
      await setDoc(
        doc(db, "users", user.uid),
        {
          fullName: fullName,
          phoneNumber: phoneNumber,
          email: email,
          ipAddress: data.ip,
        },
        { merge: true }
      );
      signOut(auth);
      setAdditionalDetailsModalOpen(false);
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
                disabled={isFullNameDisabled}
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
                disabled={isEmailDisabled}
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
                disabled={isPhoneNumberDisabled}
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
