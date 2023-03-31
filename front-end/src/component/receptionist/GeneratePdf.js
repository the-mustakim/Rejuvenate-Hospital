import axios from 'axios';
import jsPDF from 'jspdf';
import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import hmsContext from "../../context/hmsContext";



export default function GeneratePdf() {

    const host = process.env.REACT_APP_HOST_LOCATION;
   
    const context = useContext(hmsContext);
    const {
      bill,
      setBill,
      prescrpition,
      setPrescription,
      pat,
      setPat,
      doct,
      setDoct,
      fetchBill,
      generate,
      changeNavbar,
      changeNavbar2,
      changeNavbar3,
      changeNavbar4,
      } = context;
   

    useEffect(()=>{
        async function fetch(){
         await fetchBill()  
        }
        fetch();
        changeNavbar("Dashboard","/ReceptionistDashboard")
              changeNavbar2("Add Patient","/AddPatient")
              changeNavbar3("Add Appointment","/AddAppointment")
              changeNavbar4("MakeBill","/MakeBill")
    },[]);
 
    const generatePdf= async() =>{
      await generate()
      
    }
  return (
    <div>
        {/* Existing code here */}
        <button className="btn btn-warning" onClick={generatePdf}>
          Download Bill
        </button>
      </div>
  )
  }