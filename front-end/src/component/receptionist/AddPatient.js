import axios from "axios";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import hmsContext from "../../context/hmsContext";
import emailjs from "@emailjs/browser";

import { toast } from 'react-toastify';

export default function AddPatient(props) {
  const form = useRef();
  const context = useContext(hmsContext);
  let tempId;
  const {
    changeNavbar,
    changeNavbar2,
    changeNavbar3,
    changeNavbar4,
    Rpatient,
    setRPatient,
    addPatient,
    PId,
    setPId,
  } = context;
  const history = useHistory();

 
  
  

  useEffect(() => {
    changeNavbar("Dashboard", "/ReceptionistDashboard");
    changeNavbar2("Add Patient", "/AddPatient");
    changeNavbar3("Add Appointment", "/AddAppointment");
    changeNavbar4("MakeBill", "/MakeBill");
  }, []);

  useEffect(() => {}, [PId]);

  const handleClick = async (e) => {
    e.preventDefault();
    //  debugger
    if(Rpatient.firstName=="" ||
      Rpatient.lastName =="" ||
      Rpatient.email=="" ||
      Rpatient.password=="" ||
      Rpatient.age=="" ||
      Rpatient.gender=="" ||
      Rpatient.mobNo=="" ||
      Rpatient.salary=="" ||
      Rpatient.role=="" ||
      Rpatient.securityQuestion=="" ||
      Rpatient.securityAnswer=="" ||
      Rpatient.address.street=="" ||
      Rpatient.address.city=="" ||
      Rpatient.address.pincode=="" ||
      Rpatient.bloodGroup=="" ||
      Rpatient.medicalHistory=="")
      {
        toast.warn('Fields are empty!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return

      }


    tempId = await addPatient(
      Rpatient.firstName,
      Rpatient.lastName,
      Rpatient.email,
      Rpatient.password,
      Rpatient.age,
      Rpatient.gender,
      Rpatient.mobNo,
      Rpatient.salary,
      Rpatient.role,
      Rpatient.securityQuestion,
      Rpatient.securityAnswer,
      Rpatient.address.street,
      Rpatient.address.city,
      Rpatient.address.pincode,
      Rpatient.bloodGroup,
      Rpatient.medicalHistory
    );
    //console.log(tempId);
    //debugger;
    
    setRPatient({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: "",
      gender: "",
      mobNo: "",
      salary: "",
      role: "",
      securityQuestion: "",
      securityAnswer: "",
      address: { street: "", city: "", pincode: "" },
      bloodGroup: "",
      medicalHistory: "",
    });

   

    history.push("/ReceptionistDashboard");
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setRPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
      address: {
        ...prevPatient.address,
        [name]: value,
      },
    }));
  };


  return (
    <div className="container">
      <div className="addPatientForm">
        <form className="row g-3 my-3">
          <div class="col-md-12">
            <center>
              <h2>Add patient</h2>
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
              value={Rpatient.firstName}
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
              value={Rpatient.lastName}
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
              value={Rpatient.email}
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
              value={Rpatient.password}
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
              value={Rpatient.age}
              required
            />
          </div>
          {/* <div className="col-6">
            <label htmlFor="gender" class="form-label">Gender</label>
            <input type="text" class="form-control" id="gender" name='gender' onChange={onChange}
                value={patient.gender} required />
        </div> */}
          <div className="col-6">
            <label htmlFor="gender">Gender</label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              onChange={onChange}
            >
              <option value="-1">--Select Gender--</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>

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
              value={Rpatient.mobNo}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="bloodGroup">BloodGroup</label>
            <select
              className="form-select"
              id="bloodGroup"
              name="bloodGroup"
              onChange={onChange}
            >
              <option value="-1">--Select BloodGroup--</option>
              <option value="A_POSITIVE">A+</option>
              <option value="A_NEGATIVE">A-</option>
              <option value="B_POSITIVE">B+</option>
              <option value="B_NEGATIVE">B-</option>
              <option value="AB_POSITIVE">AB+</option>
              <option value="AB_NEGATIVE">AB-</option>
              <option value="O_POSITIVE">O+</option>
              <option value="O_NEGATIVE">O-</option>
            </select>
          </div>
          {/* <div className="col-6">
            <label htmlFor="bloodGroup" class="form-label">BloodGroup</label>
            <input type="text" class="form-control" id="bloodGroup" name='bloodGroup' onChange={onChange}
                     value={patient.bloodGroup} required />
                    </div> */}
          <div className="col-12">
            <label htmlFor="medicalHistory" class="form-label">
              Medical History
            </label>
            <input
              type="text"
              class="form-control"
              id="medicalHistory"
              name="medicalHistory"
              onChange={onChange}
              value={Rpatient.medicalHistory}
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
              value={Rpatient.role}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="securityQuestion" class="form-label">
            Select Question
            </label>
            <select
              className="form-select"
              id="securityQuestion"
              name="securityQuestion"
              onChange={onChange}
            >
              <option value="-1">Select Question</option>
              <option value="Favorite Dish">Favorite Dish</option>
              <option value="Favorite City">Favorite City</option>
              <option value="Favorite Color">Favorite Color</option>
            </select>
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
              value={Rpatient.securityAnswer}
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
              value={Rpatient.address.street}
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
              value={Rpatient.address.city}
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
              value={Rpatient.address.pincode}
              required
            />
          </div>
          <div className="col-12 d-flex justify-content-center align-item-center">
            <button type="submit" class="btn btn-primary" onClick={handleClick}>
              Add patient
            </button>
          </div>
        </form>
        <div style={{marginBottom:300}}>
          
        </div>
      </div>
    </div>
  );
}
