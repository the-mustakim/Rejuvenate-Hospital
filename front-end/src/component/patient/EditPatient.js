import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import hmsContext from "../../context/hmsContext";

export default function EditPatient() {
  const context = useContext(hmsContext);
  const {
    changeNavbar,
    changeNavbar2,
    changeNavbar3,
    changeNavbar4,
    patient,
    setPatient,
    getPatient,
    updatePatient,
  } = context;
  const history = useHistory();

  useEffect(() => {
    async function fetch() {
      await getPatient();
    }
    fetch();
    changeNavbar("Dashboard", "/PatientDashboard");
    changeNavbar2("Appointments", "/ShowAppointments");
    changeNavbar3("View Profile", "/ShowProfile");
    changeNavbar4("Edit Profile", "/EditPatient");
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
      address: {
        ...prevPatient.address,
        [name]: value,
      },
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      (patient.firstName == "" ||
        patient.lastName == "" ||
        patient.email == "" ||
        patient.password == "" ||
        patient.age,
      patient.gender == "" || patient.mobNo,
      patient.salary == "" || patient.role,
      patient.securityQuestion == "" ||
        patient.securityAnswer == "" ||
        patient.address.street == "" ||
        patient.address.city == "" ||
        patient.address.pincode == "" ||
        patient.bloodGroup == "" ||
        patient.medicalHistory == "")
    ) {
      toast.warn("Fields are empty!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    await updatePatient(
      patient.firstName,
      patient.lastName,
      patient.email,
      patient.password,
      patient.age,
      patient.gender,
      patient.mobNo,
      patient.salary,
      patient.role,
      patient.securityQuestion,
      patient.securityAnswer,
      patient.address.street,
      patient.address.city,
      patient.address.pincode,
      patient.bloodGroup,
      patient.medicalHistory
    );
    //  props.showAlert("patient Added", "success")
    //setPatient({ firstName: "", lastName: "", email: "", password: "", age: "", gender: "", mobNo: "", salary: "", role: "", securityQuestion: "", securityAnswer: "", address:{street: "", city: "", pincode: ""},bloodGroup:"",medicalHistory:"" })
    history.push("/PatientDashboard");
  };

  return (
    <div className="container">
      <div className="addPatientForm">
        <form className="row g-3 my-5">
          <div class="col-md-12">
            <center>
              <h2>Edit Profile</h2>
            </center>
          </div>
          <div className="col-md-6">
            <label htmlFor="firstName" class="form-label">
              First Name
            </label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              onChange={onChange}
              value={patient.firstName}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" class="form-label">
              Last Name
            </label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              name="lastName"
              onChange={onChange}
              value={patient.lastName}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              onChange={onChange}
              value={patient.email}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              onChange={onChange}
              value={patient.password}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="age" class="form-label">
              Age
            </label>
            <input
              type="text"
              class="form-control"
              id="age"
              name="age"
              onChange={onChange}
              value={patient.age}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="gender" class="form-label">
              Gender
            </label>
            <input
              type="text"
              class="form-control"
              id="gender"
              name="gender"
              onChange={onChange}
              value={patient.gender}
              readOnly={true}
            />
          </div>

          {/* <div className="col-6">
                <label htmlFor="bloodGroup" class="form-label">BloodGroup</label>
                <input type="text" class="form-control" id="bloodGroup" name='bloodGroup' onChange={onChange}
                    value={patient.bloodGroup} readOnly={true} />
            </div> */}

          <div className="col-6">
            <label htmlFor="mobNo" class="form-label">
              Mobile No
            </label>
            <input
              type="text"
              class="form-control"
              id="mobNo"
              name="mobNo"
              onChange={onChange}
              value={patient.mobNo}
              required
            />
          </div>

          <div className="col-md-0">
            <label htmlFor="role" class="form-label"></label>
            <input
              type="hidden"
              class="form-control"
              id="role"
              name="role"
              onChange={onChange}
              value={patient.role}
              hidden
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="securityQuestion" class="form-label">
              Security Question
            </label>
            <input
              type="text"
              class="form-control"
              id="securityQuestion"
              name="securityQuestion"
              onChange={onChange}
              value={patient.securityQuestion}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="securityAnswer" class="form-label">
              Security Answer
            </label>
            <input
              type="text"
              class="form-control"
              id="securityAnswer"
              name="securityAnswer"
              value={patient.securityAnswer}
              required
              onChange={onChange}
            />
          </div>
          <div className="col-4">
            <label htmlFor="street" class="form-label">
              Street
            </label>
            <input
              type="text"
              class="form-control"
              id="street"
              name="street"
              onChange={onChange}
              value={patient.address.street}
              required
            />
          </div>
          <div className="col-4">
            <label htmlFor="city" class="form-label">
              City
            </label>
            <input
              type="text"
              class="form-control"
              id="city"
              name="city"
              onChange={onChange}
              value={patient.address.city}
              required
            />
          </div>
          <div className="col-4">
            <label htmlFor="pincode" class="form-label">
              Pincode
            </label>
            <input
              type="text"
              class="form-control"
              id="pincode"
              name="pincode"
              onChange={onChange}
              value={patient.address.pincode}
              required
            />
          </div>

          <div className="col-12 d-flex justify-content-center align-item-center">
            <button type="submit" class="btn btn-primary" onClick={handleClick}>
              Update Details
            </button>
          </div>
        </form>
        <div style={{ marginBottom: 300 }}></div>
      </div>
    </div>
  );
}
