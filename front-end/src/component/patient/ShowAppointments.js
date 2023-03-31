import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./search.css";
import hmsContext from "../../context/hmsContext";

export default function ShowAppointments() {
  const context = useContext(hmsContext);
  const {
    changeNavbar,
    changeNavbar2,
    changeNavbar3,
    changeNavbar4,
    appt,
    setAppt,
    filteredAppt,
    setfilteredAppt,
    showPatientAppt,
    fetchBillGeneratePatient,
    generatePdfPateint,
    Pbill,
    Pprescrpition,
    Ppat,
    Pdoct,
    flag,
    setFlag
  } = context;

  useEffect(() => {
    async function fetch() {
      await showPatientAppt();
    }
    fetch();
    changeNavbar("Dashboard", "/PatientDashboard");
    changeNavbar2("Appointments", "/ShowAppointments");
    changeNavbar3("View Profile", "/ShowProfile");
    changeNavbar4("Edit Profile", "/EditPatient");
  }, []);

  useEffect(() => {
    if(flag===true)
    {
      generatePdfPateint();
    }
  
  }, [Pbill,Pprescrpition,Ppat,Pdoct])
  

  const onHandleDownload = async (appointmentId) => {
    //debugger;
    localStorage.setItem("appointmentId", appointmentId);
    await fetchBillGeneratePatient();
    //await generatePdfPateint();
    // history.push('GenerateBill');
  };

  const handleSearch = (event) => {
    let apptId = event.target.value;

    if (!apptId) {
      setfilteredAppt(appt); // show all data if search box is empty
    } else {
      setfilteredAppt(appt.filter((a) => a.appointmentId == apptId)); // filter data if search box is not empty
    }
  };

  return (
    <>
      <div className="container" style={{ marginTop: 200 }}>
        <div className="row my-5">
          <div className="col-sm d-flex justify-content-center">
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
        <div className="row my-5">
          <div className="col-sm">
            <table className="table table-bordered margin my-3">
              <thead>
                <tr>
                  <th>Appointment ID</th>

                  <th>Appointed Doctor</th>
                  <th>Appointment Taken Date</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Treatment Status</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppt.map((apt) => (
                  <tr key={apt.appointmentId}>
                    <td>{apt.appointmentId}</td>
                    <td>
                      {apt.appointmentSlot.doctor.user.firstName.toUpperCase()}{" "}
                      {apt.appointmentSlot.doctor.user.lastName.toUpperCase()}
                    </td>

                    <td>{apt.appointmentTakenDate}</td>
                    <td>{apt.appointmentDate}</td>
                    <td>
                      {apt.appointmentSlot.startTime} -{" "}
                      {apt.appointmentSlot.endTime}
                    </td>
                    <td>{apt.treatmentStatus}</td>

                    <td>
                      {apt.treatmentStatus === "PENDING" ? (
                        <span>Treatment Pending</span>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            onHandleDownload(apt.appointmentId);
                          }}
                        >
                          Download Bill
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
