import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import hmsContext from "../../context/hmsContext";

export default function ReceptionistDetails() {
  const history=useHistory();
  const context = useContext(hmsContext);
  const {
    receptionists,
    setReceptionists,
    freceptionists,
    fsetReceptionists,
    getAllReceptionst,
    changeNavbar, changeNavbar2 
  } = context;

  useEffect(() => {
    async function fetch() {
      await getAllReceptionst();
    }
    changeNavbar("Dashboard", "/AdminDashboard");
    changeNavbar2("AddUser", "/AddUser");
    fetch();
  }, []);

  const handleSearch = (event) => {
    let userId = event.target.value;
    //debugger;
    if (!userId) {
      setReceptionists(freceptionists); // show all data if search box is empty
    } else {
      setReceptionists(freceptionists.filter((a) => a.userId == userId)); // filter data if search box is not empty
    }
  };

  const onHandleEdit = (userId) => {
    localStorage.setItem("userId", userId);
    history.push("/EditUser");
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
              <div className="col-md-6 ">
                <div className="search">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Receptionist ID"
                    name="userId"
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
                      RECEPTIONISTS DETAILS
                    </th>
                  </tr>
                  <tr>
                    <th>Receptionist Id</th>
                    <th>Receptionist Name</th>
                    <th>Email</th>
                    <th>Mob No</th>
                    <th>Age</th>
                    <th>Salary (Rs)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {receptionists.map((receptionist, index) => (
                      <tr key={index}>
                        <td>{receptionist.userId}</td>
                        <td>
                          {receptionist.firstName} {receptionist.lastName}
                        </td>
                        <td>{receptionist.email}</td>
                        <td>{receptionist.mobNo}</td>
                        <td>{receptionist.age}</td>
                        <td>{receptionist.salary}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              onHandleEdit(receptionist.userId);
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
