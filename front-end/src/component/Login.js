import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useContext } from "react";
import hmsContext from "../context/hmsContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

import {
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./Login.css";

function Login(props) {
  const context = useContext(hmsContext);
  const { changeNavbar, changeNavbar2, changeNavbar3, changeNavbar4 } = context;
  const [credentails, setCredentails] = useState({ email: "", password: "" });
  const history = useHistory();

  const onChange = (event) => {
    setCredentails({ ...credentails, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //debugger;
    const data = JSON.stringify({
      email: credentails.email,
      password: credentails.password,
    });
    const host = process.env.REACT_APP_HOST_LOCATION;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.post(`${host}/authenticate`, data, options).then(
      (response) => {
        //console.log(response.data);

        if (response.status === 200) {
          //save auth token and redirect to home page
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user_id", response.data.user.userId);
          //props.showAlert("Logged in Successfully","success")
          let role = response.data.role;
          if (role === "ROLE_ADMIN") {
            history.push("/AdminDashboard");
            changeNavbar("Dashboard", "/AdminDashboard");
            changeNavbar2("AddUser", "/AddUser");
          }
          if (role === "ROLE_DOCTOR") {
            history.push("/DoctorDashboard");
            changeNavbar("Dashboard", "/DoctorDashboard");
            changeNavbar2("View Patient", "/showPatients");
          }

          if (role === "ROLE_RECEPTIONIST") {
            history.push("/ReceptionistDashboard");
            changeNavbar("Dashboard", "/ReceptionistDashboard");
            changeNavbar2("Add Patient", "/AddPatient");
            changeNavbar3("Add Appointment", "/AddAppointment");
            changeNavbar4("MakeBill", "/MakeBill");
          }

          if (role === "ROLE_PATIENT") {
            history.push("/PatientDashboard");
            changeNavbar("Dashboard", "/PatientDashboard");
            changeNavbar2("Appointments", "/ShowAppointments");
            changeNavbar3("Edit Profile", "/EditPatient");
          }

          if (role === "ROLE_PHARMACIST") {
            history.push("/PharmacistDashboard");
            changeNavbar("Dashboard", "/PharmacistDashboard");
            changeNavbar2("Add Medicine", "/AddMedicine");
            changeNavbar3("Search Medicine", "/SearchMedicine");
          }
          toast.success("Login Successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      },
      (error) => {
        //InValid Credentials
        toast.error("Invalid Credentials!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  };

  return (
    <>
      <main className="container main">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="PhoneImage"
              />
            </div>
            <div className="col-sm">
              <div className="row my-2">
                <input
                  type="email"
                  name="email"
                  className="input inputTag"
                  placeholder="Email address"
                  onChange={onChange}
                  value={credentails.email}
                />
              </div>
              <div className="row my-2">
                <input
                  type="password"
                  name="password"
                  className="input inputTag"
                  placeholder="Password"
                  onChange={onChange}
                  value={credentails.password}
                />
              </div>
              <div className="row my-2">
                <div className="row">
                  <div className="col">
                  <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                  </div>
                  <div className="col">
                  <Link to="/ForgotPassword">Forgot Password</Link>
                  </div>
                </div>
              </div>
              <div className="row my-2">
                <button className="btn btn-primary inputTag" type="submit" onClick={handleSubmit}>
                  Sign in
                </button>
              </div>
              {/* <div className="row myRow my-2">
                <p className="text-center">OR</p>
              </div>
              <div className="row my-2">
                <button
                  className="btn btn-primary inputTag"
                  type="submit"
                  style={{ backgroundColor: "#3b5998" }}
                >
                  <MDBIcon fab icon="facebook-f" className="mx-2" />
                  Continue with facebook
                </button>
              </div>
              <div className="row my-2">
                <button
                  className="btn btn-primary inputTag"
                  type="submit"
                  style={{ backgroundColor: "#55acee" }}
                >
                  <MDBIcon fab icon="twitter" className="mx-2" />
                  Continue with twitter
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
