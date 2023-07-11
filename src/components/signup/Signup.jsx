import React, { useState } from "react";
import { PhoneNumberUtil } from "google-libphonenumber";
import "./signup.css";
import { auth, db } from "../../auth/firebase";
import { toast } from "react-toastify";
import {
  query,
  collection,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { Button } from "react-bootstrap";
import Loader from "../loader/Loader";

const Signup = (props) => {
  const { setSignupModalOpen } = props;
  const [step, setStep] = useState(1);
  const [stepType, setStepType] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [confirmOtp, setConfirmOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const phoneUtil = PhoneNumberUtil.getInstance();

  const renderStep1 = () => {
    const handleStep1Click = async (stepType) => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("https://api.ipify.org?format=json");
        const q = query(
          collection(db, "users"),
          where("ipAddress", "==", data.ip)
        );
        const userSnap = await getDocs(q);
        // if (userSnap.size) {
        //   setSignupModalOpen(false);
        //   return toast.error(
        //     "You have already signed up from this IP address."
        //   );
        // }
        setStepType(stepType);
        setStep(2);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    return (
      <div className="signup-step1-root">
        <Button
          className="signup-step1-button"
          variant="dark"
          onClick={() => handleStep1Click("email")}
        >
          Signup with email
        </Button>
        <Button
          className="signup-step1-button"
          variant="dark"
          onClick={() => handleStep1Click("phone")}
        >
          Signup with phone
        </Button>
      </div>
    );
  };

  const renderStep2 = () => {
    const handleBackClick = () => {
      setStepType("");
      setStep(1);
    };

    const handlePhoneSignup = async (e) => {
      e.preventDefault();
      const phoneNumberToVerify = `${countryCode}${phoneNumber}`;
      const isValidNumber = phoneUtil.isValidNumber(
        phoneUtil.parse(phoneNumberToVerify)
      );
    
      if (!isValidNumber) {
        return toast.error("Invalid phone number.");
      }
    
      try {
        setIsLoading(true);
        const appVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {},
          auth
        );
        appVerifier.render().then(function(widgetId) {
         setIsLoading(false);
        }).catch(function(error) {
          console.error(error);
          toast.error("Failed to render recaptcha verifier.");
          setIsLoading(false);
        });
        appVerifier.verify().then(() => setIsLoading(true))
        const result = await signInWithPhoneNumber(
          auth,
          phoneNumberToVerify,
          appVerifier
        );
        setConfirmationResult(result);
        setCodeSent(true);
      } catch (error) {
        console.log(error);
        toast.error("Failed to send verification code.");
      } finally {
        setIsLoading(false);
      }
    };
    

    const saveToDatabase = async (user) => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("https://api.ipify.org?format=json");
        await setDoc(doc(db, "users", user.uid), {
          phoneNumber: phoneNumber,
          ipAddress: data.ip,
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const handleOtpConfirmation = async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        setSignupModalOpen(false);
        const userCredential = await confirmationResult.confirm(confirmOtp);
        const { user } = userCredential;
        if (user) saveToDatabase(user);
        setCodeSent(false);
      } catch (error) {
        toast.error("Invalid OTP, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    const handleSubmit = async () => {
      try {
        setIsLoading(true);
        setSignupModalOpen(false);
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const { data } = await axios.get("https://api.ipify.org?format=json");
        await setDoc(doc(db, "users", user.uid), {
          email: email,
          ipAddress: data.ip,
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    return (
      <div className="signup-step2-root">
        {stepType === "phone" ? (
          <>
            {!codeSent ? (
              <form onSubmit={handlePhoneSignup} className="signup-step2-root">
                <div className="signup-step2-phone-root">
                  <div className="signup-step2-phone-label">Phone number</div>
                  <input
                    type="tel"
                    placeholder="Country Code"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="signup-step2-country-code-input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="signup-step2-phone-input"
                  />
                </div>
                <div id="recaptcha-container"></div>
                <div className="signup-step2-buttons">
                  <Button
                    className="signup-step2-button"
                    variant="success"
                    type="submit"
                  >
                    Verify Phone
                  </Button>
                  <Button
                    className="signup-step2-button"
                    variant="danger"
                    onClick={handleBackClick}
                  >
                    Back
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOtpConfirmation}>
                <div className="signup-step2-confirm-otp-root">
                  <input
                    type="text"
                    placeholder="OTP"
                    value={confirmOtp}
                    onChange={(e) => setConfirmOtp(e.target.value)}
                    className="signup-step2-otp-input"
                  />
                  <div className="signup-step2-buttons">
                    <Button
                      className="signup-step2-button"
                      variant="success"
                      type="submit"
                    >
                      Confirm OTP
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </>
        ) : (
          <>
            <table className="signup-step2-table">
              <tbody>
                <tr>
                  <td>
                    <span className="signup-step2-label">Email</span>
                  </td>
                  <td>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Enter Email Address"
                      className="signup-step2-input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="signup-step2-label">Password</span>
                  </td>
                  <td>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Enter Password"
                      type="password"
                      className="signup-step2-input"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="signup-step2-buttons">
              <Button
                className="signup-step2-button"
                variant="success"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                className="signup-step2-button"
                variant="danger"
                onClick={handleBackClick}
              >
                Back
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="signup-root">
      <Loader isLoading={isLoading} />
      <h2>Signup</h2>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
    </div>
  );
};

export default Signup;
