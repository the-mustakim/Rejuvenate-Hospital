import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

export default function EarningDetails() {
  const host = process.env.REACT_APP_HOST_LOCATION;

  const [bill, setBill] = useState([
    {
      billingDate: "",
      totalMedicinePrice: "",
      treatementFees: "",
      totalPrice: "",
    },
  ]);

  const [fbill, fsetBill] = useState([
    {
      billingDate: "",
      totalMedicinePrice: "",
      treatementFees: "",
      totalPrice: "",
    },
  ]);

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    function fetch() {
      axios.get(`${host}/admin/getAllEarnings`, options).then(
        (response) => {
          setBill(response.data);
          fsetBill(response.data);
        },
        (error) => {
          //console.log(error);
        }
      );
    }
    fetch();
  }, []);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSearch = () => {
    //debugger;
    //console.log(selectedDate);
    if (!selectedDate) {
      setBill(fbill); // show all data if search box is empty
    } else {
      setBill(
        fbill.filter(
          (a) => a.billingDate === selectedDate.toISOString().substring(0, 10)
        )
      ); // filter data if search box is not empty
    }
  };

 // const filteredData = bill.filter(item => item.billingDate === selectedDate);


  const onChangeDate = (date) => {
    //debugger;
    setSelectedDate(date);
    //console.log(selectedDate);
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
              <div className="col-md-6">
                {/* <div className="search">
                 <i className="fa fa-search"></i>
                  <DatePicker
                    className="form-control"
                    placeholderText="Enter Bill Date"
                   selected={selectedDate}
                    dateFormat="yyyy-MM-dd"
                    onChange={onChangeDate}
                    
                  />
                  <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                  </button>
                </div> */}
              </div>
            </div>
            <br></br>

            <div style={{ paddingTop: "20px" }}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th colSpan="5" className="text-center">
                      Earning Details
                    </th>
                  </tr>
                  <tr>
                    <th>Earning Date</th>
                    <th>Total Medicine Earnings</th>
                    <th>Total Treatment Fees Earnings</th>
                    <th>Total Earnings</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {bill.map((bills, index) => (
                      <tr key={index}>
                        <td>{bills.billingDate}</td>
                        <td>{bills.totalMedicinePrice}</td>
                        <td>{bills.treatementFees}</td>
                        <td>{bills.totalPrice}</td>
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
