import React, { useState } from "react";
import "./login.css";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { toast } from "react-toastify";
import { PhoneNumberUtil } from "google-libphonenumber";
import { Button } from "react-bootstrap";

const phoneUtil = PhoneNumberUtil.getInstance();

const Login = (props) => {
  const { setLoginModalOpen } = props;
  const [step, setStep] = useState(1);
  const [stepType, setStepType] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [password, setPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [confirmOtp, setConfirmOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const auth = getAuth();

  const renderStep1 = () => {
    const handleStep1Click = (stepType) => {
      setStepType(stepType);
      setStep(2);
    };
    return (
      <div className="login-step1-root">
        <Button
          className="login-step1-button"
          variant="dark"
          onClick={() => handleStep1Click("email")}
        >
          Login with email
        </Button>
        <Button
          className="login-step1-button"
          variant="dark"
          onClick={() => handleStep1Click("phone")}
        >
          Login with phone
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
        toast.error("Failed to send verification code.");
      }
    };

    const handleOtpConfirmation = async (e) => {
      e.preventDefault();
      try {
        await confirmationResult.confirm(confirmOtp);
        setPhoneNumber("");
        setCodeSent(false);
        setLoginModalOpen(false);
      } catch (error) {
        toast.error("Invalid OTP, please try again.");
      }
    };
    const handleSubmit = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setLoginModalOpen(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    return (
      <div className="login-step2-root">
        {stepType === "email" ? (
          <>
            <table className="login-step2-table">
              <tbody>
                <tr>
                  <td>
                    <span className="login-step2-label">Email</span>
                  </td>
                  <td>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Enter Email Address"
                      className="login-step2-input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="login-step2-label">Password</span>
                  </td>
                  <td>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Enter Password"
                      type="password"
                      className="login-step2-input"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="login-step2-buttons">
              <Button
                className="login-step2-button"
                variant="success"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                className="login-step2-button"
                variant="danger"
                onClick={handleBackClick}
              >
                Back
              </Button>
            </div>
          </>
        ) : (
          <>
            {!codeSent ? (
              <form onSubmit={handlePhoneSignup} className="login-step2-root">
                <div className="login-step2-phone-root">
                  <div className="login-step2-phone-label">Phone number</div>
                  <input
                    type="tel"
                    placeholder="Country Code"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="login-step2-country-code-input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="login-step2-phone-input"
                  />
                </div>
                <div id="recaptcha-container"></div>
                <div className="login-step2-buttons">
                  <Button
                    className="login-step2-button"
                    variant="success"
                    type="submit"
                  >
                    Verify Phone
                  </Button>
                  <Button
                    className="login-step2-button"
                    variant="danger"
                    onClick={handleBackClick}
                  >
                    Back
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOtpConfirmation}>
                <div className="login-step2-confirm-otp-root">
                  <input
                    type="text"
                    placeholder="OTP"
                    value={confirmOtp}
                    onChange={(e) => setConfirmOtp(e.target.value)}
                    className="login-step2-otp-input"
                  />
                  <div className="login-step2-buttons">
                    <Button
                      className="login-step2-button"
                      variant="success"
                      type="submit"
                    >
                      Confirm OTP
                    </Button>
                    <Button
                      className="login-step2-button"
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
        )}
      </div>
    );
  };

  return (
    <div className="login-root">
      <h2>Login</h2>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
    </div>
  );
};

export default Login;
