import React, { useEffect, useState } from "react";
import { PhoneNumberUtil } from "google-libphonenumber";
import "./signup.css";
import { auth, db } from "../../auth/firebase";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import { Button } from "react-bootstrap";

const Signup = (props) => {
  const { setSignupModalOpen, setIsSignupComplete } = props;
  const [step, setStep] = useState(1);
  const [stepType, setStepType] = useState("");
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [confirmOtp, setConfirmOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [user, setUser] = useState();

  const phoneUtil = PhoneNumberUtil.getInstance();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const renderStep1 = () => {
    setIsSignupComplete(false);
    const handleStep1Click = (stepType) => {
      setStepType(stepType);
      setStep(2);
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

      const appVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );

      try {
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
      }
    };

    const handleOtpConfirmation = async (e) => {
      e.preventDefault();
      try {
        await confirmationResult.confirm(confirmOtp);
        setCodeSent(false);
        setStep(3);
      } catch (error) {
        toast.error("Invalid OTP, please try again.");
      }
    };
    const handleSubmit = async () => {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(user);
        setStep(3);
      } catch (error) {
        toast.error(error.message);
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
                    <Button
                      className="signup-step2-button"
                      variant="danger"
                      onClick={handleBackClick}
                    >
                      Back
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

  const renderStep3 = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setSignupModalOpen(false);
        const { data } = await axios.get("https://api.ipify.org?format=json");
        await setDoc(doc(db, "users", user.uid), {
          fullName: fullName,
          phoneNumber: phoneNumber,
          email: email,
          ipAddress: data.ip,
        });
        setIsSignupComplete(true);
      } catch (error) {
        toast.error(error.message);
      }
    };
    return (
      <div className="signup-step3-root">
        <table className="signup-step2-table">
          <tbody>
            <tr>
              <td>
                <span className="signup-step2-label">Full Name</span>
              </td>
              <td>
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  placeholder="Enter Full Name"
                  className="signup-step2-input"
                />
              </td>
            </tr>
            <tr>
              <td>
                <span className="signup-step2-label">
                  {stepType === "email" ? "Phone Number" : "Email"}
                </span>
              </td>
              <td>
                {stepType === "email" ? (
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    placeholder="Enter Phone Number"
                    className="signup-step2-input"
                  />
                ) : (
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter Email Address"
                    className="signup-step2-input"
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <Button
          className="signup-step2-button"
          variant="success"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    );
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
