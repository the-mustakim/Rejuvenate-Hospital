import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import hmsContext from "../../context/hmsContext";

export default function AdminDashboard() {
  const context = useContext(hmsContext);
  const { getDashboard, dashboardDetails, changeNavbar, changeNavbar2 } =
    context;

  useEffect(() => {
    async function fetch() {
      await getDashboard();
    }
    fetch();
    changeNavbar("Dashboard", "/AdminDashboard");
    changeNavbar2("AddUser", "/AddUser");
  }, []);

  return (
    <>
      <div className="container" style={{marginTop:150}}>
        <div className="row">
          <div className="col bg-light my-5" style={{borderRadius:10}}>
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
          <div className="col bg-light m-5" style={{borderRadius:10}}>
            <div className="row m-3">
              <div className="col">
                <div className="my-3">
                  <div className="card">
                    <div class="card-header bg-transparent border-success">
                      TOTAL PATIENTS
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{dashboardDetails.Patient}</h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="my-3">
                  <div className="card">
                    <div class="card-header bg-transparent border-success">
                      TOTAL RECEPTIONISTS
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {dashboardDetails.Receptionist}
                      </h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="my-3">
                  <div className="card">
                    <div class="card-header bg-transparent border-success">
                      TOTAL PHARMACISTS
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {dashboardDetails.Pharmacist}
                      </h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="my-3">
                  <div className="card">
                    <div class="card-header bg-transparent border-success">
                      TOTAL DOCTORS
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {dashboardDetails.Doctor}
                      </h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-3">
              <div className="col">
                <div className="my-3">
                  <div className="card">
                    <div class="card-header bg-transparent border-success">
                      TOTAL APPOINTMENTS
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {dashboardDetails.TotalAppointments}
                      </h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="my-3">
                  <div className="card">
                    <div class="card-header bg-transparent border-success">
                      TOTAL MEDICINES
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {dashboardDetails.MedicineQuantity}
                      </h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="my-3">
                  <div className="card">
                    <div class="card-header bg-transparent border-success">
                      TOTAL EARNINGS
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {dashboardDetails.TotalEarnings} Rs
                      </h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
