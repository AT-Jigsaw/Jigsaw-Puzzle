import React, { useState } from "react";
import "./signup.css";
import { auth, db } from "../../auth/firebase";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const Signup = (props) => {
  const { setSignupModalOpen } = props;
  const [step, setStep] = useState(1);
  const [stepType, setStepType] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const renderStep1 = () => {
    const handleStep1Click = (stepType) => {
      setStepType(stepType);
      setStep(2);
    };
    return (
      <div>
        <button onClick={() => handleStep1Click("email")}>
          Signup with email
        </button>
        <button onClick={() => handleStep1Click("phone")}>
          Signup with phone
        </button>
      </div>
    );
  };

  const renderStep2 = () => {
    const handleBackClick = () => {
      setStepType("");
      setStep(1);
    };
    const handleSubmit = () => {
      setStep(3);
    };
    return (
      <div>
        Enter {stepType === "email" ? "Email" : "Phone Number"}
        {stepType === "phone" ? (
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            placeholder="Enter Phone Number"
          />
        ) : (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Email Address"
            />
            Enter Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter Password"
            />
          </>
        )}
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleBackClick}>Back</button>
      </div>
    );
  };

  const renderStep3 = () => {
    const handleSubmit = () => {};
    return (
      <div>
        <input
          handleChange={(e) => setFullName(e.target.value)}
          value={fullName}
          placeholder="Enter Full Name"
        />
        {stepType === "email" ? (
          <input
            handleChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            placeholder="Enter Phone Number"
          />
        ) : (
          <input
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Email Address"
          />
        )}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password)
      return toast.error("Please enter both email and password");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const { data } = await axios.get("https://api.ipify.org?format=json");
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        ipAddress: data.ip,
      });
      setSignupModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="signup-root">
      <h2>Signup</h2>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};

export default Signup;
