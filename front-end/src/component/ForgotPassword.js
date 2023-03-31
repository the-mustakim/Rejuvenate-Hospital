import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import resetImg from "../images/resetImg.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  const host = process.env.REACT_APP_HOST_LOCATION;
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${host}/checkAnswer`, {
        email,
        securityQuestion,
        securityAnswer,
      });
      history.push(`/ResetPassword/${email}`);
    } catch (error) {
      //console.error(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSecurityAnswerChange = (e) => {
    setSecurityAnswer(e.target.value);
  };

  const handleSecurityQuestionChange = (e) => {
    setSecurityQuestion(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${host}/getSecurityQuestion`, {
        email,
      });
      setSecurityQuestion(response.data);
    } catch (error) {
      //console.error(error);
    }
  };

  return (
    <>
      <main className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <img src={resetImg} className="img-fluid resetImg" alt="resetImg" />
              </div>
              <div className="col-sm padcol">
                <div className="divCennter">
                <div className="row my-3">
                  <div className="col d-flex justify-content-center">
                    <input
                      className="inputTag text-center"
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col d-flex justify-content-center">
                    <button className="btn btn-primary inputTag" onClick={handleVerify}>
                      Verify Email
                    </button>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col d-flex justify-content-center">
                    <input
                      className="inputTag text-center"
                      type="text"
                      name="securityQuestion"
                      value={securityQuestion}
                      onChange={handleSecurityQuestionChange}
                      readOnly={true}
                      placeholder="Security question"
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col d-flex justify-content-center">
                    <input
                      className="inputTag text-center"
                      type="text"
                      name="securityAnswer"
                      value={securityAnswer}
                      onChange={handleSecurityAnswerChange}
                      placeholder="Security answer"
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col d-flex justify-content-center">
                    <button
                      className="btn btn-primary inputTag"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
      </main>
    </>
  );
}

export default ForgotPassword;
