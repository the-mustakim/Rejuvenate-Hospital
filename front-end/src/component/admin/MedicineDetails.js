import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import hmsContext from "../../context/hmsContext";

export default function MedicineDetails() {
  const context = useContext(hmsContext);
  const { med, setMed, fmed, fsetMed, bringMeds, changeNavbar, changeNavbar2   } = context;

  useEffect(() => {
    async function fetch() {
      await bringMeds();
    }
    changeNavbar("Dashboard", "/AdminDashboard");
    changeNavbar2("AddUser", "/AddUser");
    fetch();
  }, []);

  const handleSearch = (event) => {
    let medicineId = event.target.value;
    //debugger;
    if (!medicineId) {
      setMed(fmed); // show all data if search box is empty
    } else {
      setMed(fmed.filter((a) => a.medicineId == medicineId)); // filter data if search box is not empty
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
              <div className="col-md-6 ">
                <div className="search">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Medicine ID"
                    name="medicineId"
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
                      Medicines Details
                    </th>
                  </tr>
                  <tr>
                    <th>Medicine Id</th>
                    <th>Medicine Name</th>
                    <th>Company</th>
                    <th>Manufactured Date</th>
                    <th>Expiry Date</th>
                    <th>Medicine AddedDate</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {med.map((medicine, index) => (
                      <tr key={index}>
                        <td>{medicine.medicineId}</td>
                        <td>{medicine.medicineName}</td>
                        <td>{medicine.company}</td>
                        <td>{medicine.manufacturedDate}</td>
                        <td>{medicine.expiryDate}</td>
                        <td>{medicine.medicineAddedDate}</td>
                        <td>{medicine.stock}</td>
                        <td>{medicine.price}</td>
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
