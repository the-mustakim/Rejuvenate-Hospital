import axios from "axios";
import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import hmsContext from "../../context/hmsContext";
import { toast } from 'react-toastify'
import './search.css'

export default function AddAppointment(props) {
  const context = useContext(hmsContext);
  const {
    isLocked,
    setIsLocked,
    R2patient,
    setR2Patient,
    Rdoctor,
    setRdoctor,
    appointment,
    setAppointment,
    appointmentSlot,
    setAppointmentSlot,
    getAllRDoctors,
    getPatientById,
    AddAppointment,
    getSlots,
    changeNavbar,
    changeNavbar2,
    changeNavbar3,
    changeNavbar4,
  } = context;

  const history = useHistory();

  const handlePatientClick = async (e) => {
    await getPatientById();
  };

  useEffect(() => {
    async function fetch() {
      await getAllRDoctors();
    }
    fetch();
    changeNavbar("Dashboard", "/ReceptionistDashboard");
    changeNavbar2("Add Patient", "/AddPatient");
    changeNavbar3("Add Appointment", "/AddAppointment");
    changeNavbar4("MakeBill", "/MakeBill");
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if(appointment.appointmentDate == "" ||
      appointment.problemDescription  == "" ||
      localStorage.getItem("doctorId") == "" ||
      localStorage.getItem("slotId") == ""
      )
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
    await AddAppointment(
      appointment.appointmentDate,
      appointment.problemDescription,
      "PENDING",
      "NOT_GENERATED",
      appointment.patientId,
      localStorage.getItem("doctorId"),
      localStorage.getItem("slotId")
    );
    history.push("/ReceptionistDashboard");
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };

  const onDoctorChange = async (e) => {
    await getSlots(e.target.value);
  };

  const onSlotChange = (e) => {
    const slotId = e.target.value;
    localStorage.setItem("slotId", slotId);
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="row d-flex justify-content-center align-items-center" style={{marginTop:100}}>
            <center>
              <h2>Add Appointment</h2>
            </center>
          </div>
          <div className="row d-flex justify-content-center align-items-center my-3">
            <div className="search">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Patient Id"
                name="patientId"
                value={appointment.patientId}
                onChange={onChange}
              />
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  handlePatientClick(e);
              
                }}
                style={{right:16}}
              >
                Search
              </button>
            </div>
          </div>
          <div className="row">
              <div className="col">
                <label htmlFor="firstName" className="form-label">
                  Patient Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={onChange}
                  value={R2patient.user.firstName}
                  required
                  readOnly={isLocked}
                />
              </div>
              <div className="col">
                <label htmlFor="lastName" class="form-label">
                  Patient Age
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={onChange}
                  value={R2patient.user.age}
                  required
                  readOnly={isLocked}
                />
              </div>
            </div>
          <div className="row my-3">
              <div className="col">
                <label htmlFor="bloodGroup" class="form-label">
                  Patient BloodGroup
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bloodGroup"
                  name="bloodGroup"
                  onChange={onChange}
                  value={R2patient.bloodGroup}
                  required
                  readOnly={isLocked}
                />
              </div>
              <div className="col">
                <label htmlFor="doctor">Doctor</label>
                <select
                  className="form-select"
                  id="doctorId"
                  name="doctorId"
                  onChange={onDoctorChange}
                >
                  <option value="">--Select--</option>
                  {Rdoctor.map((doc) => {
                    return (
                      <option value={doc.doctorId}>
                        {doc.user.firstName} {doc.user.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="row my-3">
              <div className="col">
                <label htmlFor="appointmentDate" className="form-label">
                  Appointment Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="appointmentDate"
                  name="appointmentDate"
                  onChange={onChange}
                  value={appointment.appointmentDate}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="appointmentSlotId">Appointment Slot</label>
                <select
                  className="form-select"
                  id="appointmentSlotId"
                  name="appointmentSlotId"
                  onChange={onSlotChange}
                >
                  <option value="">--Select--</option>
                  {appointmentSlot.map((app) => {
                    return (
                      <option value={app.appointmentSlotId}>
                        {app.startTime}-{app.endTime}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="row my-3">
            <label>Problem Description</label>
              <textarea
                className="form-control"
                id="pblmDesc"
                rows="6"
                name="problemDescription"
                value={appointment.problemDescription}
                onChange={onChange}
              ></textarea>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
             <div className="col d-flex justify-content-center align-items-center">
             <button
                type="submit"
                class="btn btn-primary"
                onClick={handleClick}
              >
                Add Appointment
              </button>
             </div>
            </div>
        </form>
        <div style={{marginBottom:300}}>
          
        </div>
      </div>
    </>
  );
}
