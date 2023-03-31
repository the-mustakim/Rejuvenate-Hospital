import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./search.css";
import hmsContext from "../../context/hmsContext";

export default function MakeBill() {
  const host = process.env.REACT_APP_HOST_LOCATION;
  const context = useContext(hmsContext);
  const {
    Rappt,
    setRappt,
    RfilteredAppt,
    setRfilteredAppt,
    getAppt,
    generatePdf,
    fetchBillGenerate,
    changeNavbar,
    changeNavbar2,
    changeNavbar3,
    changeNavbar4,
    Gbill,Gpat,Gdoct,Gprescrpition,
    setGBill,
    setGPrescription,
    setGPat,
    setGDoct,
    flag
  } = context;

  const history = useHistory();

  useEffect(() => {
    async function fetch() {
      await getAppt();
    }
    fetch();
    changeNavbar("Dashboard", "/ReceptionistDashboard");
    changeNavbar2("Add Patient", "/AddPatient");
    changeNavbar3("Add Appointment", "/AddAppointment");
    changeNavbar4("MakeBill", "/MakeBill");
  }, []);

  useEffect(() => {
      //console.log("Re Rendring the component")
      //debugger
      if(flag===true)
      {
        //debugger
        generatePdf();
      }
  }, [Gbill,Gpat,Gdoct,Gprescrpition])
  

  const onHandleGenerate = (appointmentId) => {
    //debugger
    localStorage.setItem("appointmentId", appointmentId);
    history.push("GenerateBill");
  };

  const onHandleDownload = async (appointmentId) => {
    //debugger
    localStorage.setItem("appointmentId", appointmentId);
    await fetchBillGenerate();
    //await generatePdf();
  };

  const handleSearch = (event) => {
    let apptId = event.target.value;

    if (!apptId) {
      setRfilteredAppt(Rappt); // show all data if search box is empty
    } else {
      setRfilteredAppt(Rappt.filter((a) => a.appointmentId == apptId)); // filter data if search box is not empty
    }
  };

  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ marginTop: 100 }}
        >
          <center>
            <h2>Make Bill</h2>
          </center>
        </div>
        <div className="row my-4">
          <div className="col d-flex justify-content-center align-items-center">
            <div className="search">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Appointment ID"
                name="appointmentId"
                onChange={(event) => handleSearch(event)}
              />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col d-flex justify-content-center align-items-center">
            <table className="table table-bordered margin my-3">
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Patient Name</th>
                  <th>Patient Age</th>
                  <th>Patient BG</th>
                  <th>Patient Contact No</th>
                  <th>Appointed Doctor</th>
                  <th>Appointment Taken Date</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Treatment Status</th>
                  <th>Appointment Price</th>
                  <th>Bill Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {RfilteredAppt.map((apt) => (
                  <tr key={apt.appointmentId}>
                    <td>{apt.appointmentId}</td>
                    <td>
                      {apt.firstName.toUpperCase()} {apt.lastName.toUpperCase()}
                    </td>
                    <td>{apt.age}</td>
                    <td>{apt.bloodGroup}</td>
                    <td>{apt.mobNo}</td>
                    <td>{apt.doctorName.toUpperCase()}</td>
                    <td>{apt.appointmentTakenDate}</td>
                    <td>{apt.appointmentDate}</td>
                    <td>
                      {apt.startTime} - {apt.endTime}
                    </td>
                    <td>{apt.treatmentStatus}</td>
                    <td>{apt.totaltreatementFees}</td>
                    <td>{apt.billStatus}</td>
                    <td>
                      {apt.treatmentStatus === "PENDING" ? (
                        <span>Treatment Pending</span>
                      ) : apt.billStatus === "GENERATED" ? (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            onHandleDownload(apt.appointmentId);
                          }}
                        >
                          Download Bill
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            onHandleGenerate(apt.appointmentId);
                          }}
                        >
                          Generate Bill
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
