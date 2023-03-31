
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from "react";
import { useHistory } from 'react-router-dom'
import hmsContext from '../../context/hmsContext';

export default function ShowPatients() {

  const context = useContext(hmsContext);
  const { changeNavbar, changeNavbar2,getDoctor, AppointmentList,getAllAppointments} = context;
  const history=useHistory();
  var count=0;
  useEffect(() => { 
    //debugger
    async function fetch(){
    await getAllAppointments()
    }
    fetch()
    changeNavbar("Dashboard","/DoctorDashboard")
    changeNavbar2("View Patient","/showPatients")
    //getAllAppointments(doctor.doctorId)
  }, [])

  const ViewAppointment=(e)=>{
    //debugger;
    localStorage.setItem("appointmentId",e.target.getAttribute("appointmentId"))
    //const appo=e.target.getAttribute("appointmentId")
    history.push("/viewAppointment")
  }

  return (
    <>
      <div className="container">
      <div className='fw-bold text-center' style={{marginTop:100}}>Todays Appointment Date : {new Date().getDate()}-{new Date().getMonth()+1}-{new Date().getFullYear()}</div>
       <table className="table table-bordered margin my-3">
          { <tbody>
            <tr>
              <td>Appointment No</td>
              <td>Patient First Name</td>
              <td>Appointment Taken Date</td>
              <td>Appointment Date</td>
              <td>Treatment Status</td>
              <td>Take Action</td>
            </tr>
          {
            AppointmentList.map((appointment)=>{count=count+1
                              return    <tr key={appointment.appointmentId}>
                                        <td>{count}</td>
                                        <td>{appointment.patient.user.firstName +" "+ appointment.patient.user.lastName}</td>
                                        <td>{appointment.appointmentTakenDate}</td>
                                        <td>{appointment.appointmentDate}</td>
                                        <td>{appointment.treatmentStatus}</td>
                                        <td>
                                        <button type="button" className="btn btn-danger" appointmentId={appointment.appointmentId} onClick={ViewAppointment}>View</button>
                                        </td>
                                      </tr>
            })
            
          }
        </tbody>
        }
        </table>
        </div>
    </>
  )
}
