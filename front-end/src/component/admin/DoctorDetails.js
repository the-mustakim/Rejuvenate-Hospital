import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import hmsContext from "../../context/hmsContext";

export default function DoctorDetails() {
  const history=useHistory();
  const context = useContext(hmsContext);
  const { doctors, setDoctors, fdoctors, refreshPage,fsetDoctors, getAllDocs, changeNavbar, changeNavbar2 } = context;

  useEffect(() => {
    changeNavbar("Dashboard", "/AdminDashboard");
    changeNavbar2("AddUser", "/AddUser");
    async function fetch() {
      await getAllDocs();
    }
    fetch();
    //debugger;
  }, []);

  useEffect(() => {
    async function fetch() {
      await getAllDocs();
    }
    fetch();
  }, [refreshPage])
  

  

  const handleSearch = (event) => {
    let doctorId = event.target.value;
    //debugger;
    if (!doctorId) {
      setDoctors(fdoctors); // show all data if search box is empty
    } else {
      setDoctors(fdoctors.filter((a) => a.doctorId == doctorId)); // filter data if search box is not empty
    }
  };
  const onHandleEdit = (doctorId) => {
    localStorage.setItem("doctorId", doctorId);
    history.push("/EditDoctor");
  };

  return (
    <div className="container">
      <div className="row">
        <div
          className="col-md-3 bg-light my-5"
          style={{ height: 367, borderRadius: 10 }}
        >
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
        <div className="container col-md-9  my-5">
          <div className="row">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-6">
                <div className="search">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Doctor ID"
                    name="doctorId"
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
                    <th colSpan="9" className="text-center">
                      DOCTOR DETAILS
                    </th>
                  </tr>
                  <tr>
                    <th>Doctor Id</th>
                    <th>Doctor Name</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Mob No</th>
                    <th>Age</th>
                    <th>Salary</th>
                    <th>Charges</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {doctors.map((doctor, index) => (
                      <tr key={index}>
                        <td>{doctor.doctorId}</td>
                        <td>
                          {doctor.user.firstName} {doctor.user.lastName}
                        </td>
                        <td>{doctor.department}</td>
                        <td>{doctor.user.email}</td>
                        <td>{doctor.user.mobNo}</td>
                        <td>{doctor.user.age}</td>
                        <td>{doctor.user.salary}</td>
                        <td>{doctor.treatmentFees}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              onHandleEdit(doctor.doctorId);
                            }}
                          >
                            Edit
                          </button>
                        </td>
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
