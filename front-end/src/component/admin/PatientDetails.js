import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import hmsContext from "../../context/hmsContext";

export default function PatientDetails() {
  const context = useContext(hmsContext);
  const { patients, setPatients, fpatients, fsetPatients, getPatients, changeNavbar, changeNavbar2 } =
    context;

  useEffect(() => {
    async function fetch() {
      await getPatients();
    }
    changeNavbar("Dashboard", "/AdminDashboard");
    changeNavbar2("AddUser", "/AddUser");
    fetch();
  }, []);

  const handleSearch = (event) => {
    let patientId = event.target.value;
    //debugger;
    if (!patientId) {
      setPatients(fpatients); // show all data if search box is empty
    } else {
      setPatients(fpatients.filter((a) => a.patientId == patientId)); // filter data if search box is not empty
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 bg-light my-5" style={{height:367,borderRadius:10}}>
          <div className="list-group mt-3">
            <Link
              to="/AdminDashboard"
              className="list-group-item list-group-item-action"
            >
              Dashboard
            </Link>
            <Link
              to="/DoctorDetails"
              className="list-group-item list-group-item-action"
            >
              Doctors
            </Link>
            <Link
              to="/PatientDetails"
              className="list-group-item list-group-item-action"
            >
              Patients
            </Link>
            <Link
              to="/ReceptionistDetails"
              className="list-group-item list-group-item-action"
            >
              Receptionists
            </Link>
            <Link
              to="/PharmacistDetails"
              className="list-group-item list-group-item-action"
            >
              Pharmacists
            </Link>
            <Link
              to="/MedicineDetails"
              className="list-group-item list-group-item-action"
            >
              Medicines
            </Link>
            <Link
              to="/AppointmentDetails"
              className="list-group-item list-group-item-action"
            >
              Appointments
            </Link>
            <Link
              to="/EarningDetails"
              className="list-group-item list-group-item-action"
            >
              Total Earnings
            </Link>
          </div>
        </div>
        <div className="container col-md-9 my-5">
          <div className="row">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-6">
                <div className="search">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Patient ID"
                    name="patientId"
                    onChange={handleSearch}
                  />
                  <button className="btn btn-primary">Search</button>
                </div>
              </div>
            </div>
            <br></br>

            <div style={{ paddingTop: "20px" }}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th colSpan="8" className="text-center">
                      PATIENTS DETAILS
                    </th>
                  </tr>
                  <tr>
                    <th>Patient Id</th>
                    <th>Patient Name</th>
                    <th>Email</th>
                    <th>Mob No</th>
                    <th>Age</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {patients.map((patient, index) => (
                      <tr key={index}>
                        <td>{patient.patientId}</td>
                        <td>
                          {patient.user.firstName} {patient.user.lastName}
                        </td>
                        <td>{patient.user.email}</td>
                        <td>{patient.user.mobNo}</td>
                        <td>{patient.user.age}</td>
                      </tr>
                    ))}
                  </tbody>
                }
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
