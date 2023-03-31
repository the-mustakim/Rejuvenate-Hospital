import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import hmsContext from "../../context/hmsContext";

export default function PharmacistDetails() {
  const history=useHistory()
  const context = useContext(hmsContext);
  const { pharmacists, setPharmacists, fpharmacists, getAllPharma, changeNavbar, changeNavbar2 } = context;

  useEffect(() => {
    async function fetch() {
      await getAllPharma();
    }
    changeNavbar("Dashboard", "/AdminDashboard");
    changeNavbar2("AddUser", "/AddUser");
    fetch();
  }, []);

  const handleSearch = (event) => {
    let userId = event.target.value;
    //debugger;
    if (!userId) {
      setPharmacists(fpharmacists); // show all data if search box is empty
    } else {
      setPharmacists(fpharmacists.filter((a) => a.userId == userId)); // filter data if search box is not empty
    }
  };

  const onHandleEdit = (userId) => {
    localStorage.setItem("userId", userId);
    history.push("/EditUser");
  }

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
        <div className="container col-md-9 my-5">
          <div className="row">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-6 ">
                <div className="search">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Pharmacist ID"
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
                      PHARMACISTS DETAILS
                    </th>
                  </tr>
                  <tr>
                    <th>Pharmacist Id</th>
                    <th>Pharmacist Name</th>
                    <th>Email</th>
                    <th>Mob No</th>
                    <th>Age</th>
                    <th>Salary (Rs)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {pharmacists.map((pharmacist, index) => (
                      <tr key={index}>
                        <td>{pharmacist.userId}</td>
                        <td>
                          {pharmacist.firstName} {pharmacist.lastName}
                        </td>
                        <td>{pharmacist.email}</td>
                        <td>{pharmacist.mobNo}</td>
                        <td>{pharmacist.age}</td>
                        <td>{pharmacist.salary}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              onHandleEdit(pharmacist.userId);
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
