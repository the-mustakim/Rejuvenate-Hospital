import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import hmsContext from "../../context/hmsContext";

export default function EditDoctor() {
 
  const context = useContext(hmsContext);
  const { udoctors, setUdoctors, getDoc, updateDoc, changeNavbar, changeNavbar2  } = context;
  const history = useHistory();


  useEffect(() => {
    async function fetch() {
      await getDoc();
    }
    changeNavbar("Dashboard", "/AdminDashboard");
    changeNavbar2("AddUser", "/AddUser");
    fetch();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setUdoctors((prevDoc) => ({
      ...prevDoc,
      [name]: value,
      user: {
        ...prevDoc.user,
        [name]: value,
        address: {
          ...prevDoc.user.address,
          [name]: value,
        },
      },
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (
      (udoctors.doctorId == "" ||
      udoctors.department == "" ||
      udoctors.treatmentFees == "" ||
      udoctors.user.userId == "" ||
      udoctors.user.firstName == "" ||
      udoctors.user.lastName == "" ||
      udoctors.user.email == "" ||
      udoctors.user.age == "" ||
      udoctors.user.gender == "" ||
      udoctors.user.mobNo == "" ||
      udoctors.user.salary == "" ||
      udoctors.user.address.street == "" ||
      udoctors.user.address.city == "" ||
      udoctors.user.address.pincode == "")
    ) {
      toast.warn("Fields are empty!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    updateDoc(
      udoctors.doctorId,
      udoctors.department,
      udoctors.treatmentFees,
      udoctors.user.userId,
      udoctors.user.firstName,
      udoctors.user.lastName,
      udoctors.user.email,
      udoctors.user.age,
      udoctors.user.gender,
      udoctors.user.mobNo,
      udoctors.user.salary,
      udoctors.user.address.street,
      udoctors.user.address.city,
      udoctors.user.address.pincode
    );

    history.push("/DoctorDetails");
  };

  return (
    <div className="container">
      <div style={{marginTop:100}}>
        <form className="row g-3">
          <div class="col-md-12">
            <center>
              <h2>Edit Doctor Profile</h2>
            </center>
          </div>
          <div className="col-md-6">
            <label htmlFor="firstName" class="form-label">
              Doctor ID
            </label>
            <input
              type="text"
              class="form-control"
              id="doctorId"
              name="doctorId"
              onChange={onChange}
              value={udoctors.doctorId}
              required
              readOnly={true}
            />
          </div>

          <div className="col-6">
            <label htmlFor="department" class="form-label">
              Department
            </label>
            <input
              type="department"
              class="form-control"
              id="department"
              name="department"
              onChange={onChange}
              value={udoctors.department}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName" class="form-label">
              Doctor First Name
            </label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              onChange={onChange}
              value={udoctors.user.firstName}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName" class="form-label">
              Doctor Last Name
            </label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              name="lastName"
              onChange={onChange}
              value={udoctors.user.lastName}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" class="form-label">
              Email
            </label>
            <input
              type="text"
              class="form-control"
              id="email"
              name="email"
              onChange={onChange}
              value={udoctors.user.email}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="age" class="form-label">
              Age
            </label>
            <input
              type="text"
              class="form-control"
              id="age"
              name="age"
              onChange={onChange}
              value={udoctors.user.age}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="gender" class="form-label">
              Gender
            </label>
            <input
              type="text"
              class="form-control"
              id="gender"
              name="gender"
              onChange={onChange}
              value={udoctors.user.gender}
              required
            />
          </div>

          <div className="col-6">
            <label htmlFor="salary" class="form-label">
              Salary
            </label>
            <input
              type="text"
              class="form-control"
              id="salary"
              name="salary"
              onChange={onChange}
              value={udoctors.user.salary}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="treatmentFees" class="form-label">
              Treatment Fees
            </label>
            <input
              type="text"
              class="form-control"
              id="treatmentFees"
              name="treatmentFees"
              onChange={onChange}
              value={udoctors.treatmentFees}
              required
            />
          </div>

          <div className="col-6">
            <label htmlFor="mobNo" class="form-label">
              Contact No.
            </label>
            <input
              type="text"
              class="form-control"
              id="mobNo"
              name="mobNo"
              onChange={onChange}
              value={udoctors.user.mobNo}
              required
            />
          </div>
          <div className="col-4">
            <label htmlFor="street" class="form-label">
              Street
            </label>
            <input
              type="text"
              class="form-control"
              id="street"
              name="street"
              onChange={onChange}
              value={udoctors.user.address.street}
              required
            />
          </div>
          <div className="col-4">
            <label htmlFor="city" class="form-label">
              City
            </label>
            <input
              type="text"
              class="form-control"
              id="city"
              name="city"
              onChange={onChange}
              value={udoctors.user.address.city}
              required
            />
          </div>
          <div className="col-4">
            <label htmlFor="pincode" class="form-label">
              Pincode
            </label>
            <input
              type="text"
              class="form-control"
              id="pincode"
              name="pincode"
              onChange={onChange}
              value={udoctors.user.address.pincode}
              required
            />
          </div>

          <div className="col-12 d-flex justify-content-center">
            <button type="submit" class="btn btn-primary" onClick={handleClick}>
              Update Details
            </button>
          </div>
        </form>
        <div style={{marginBottom:300}}>
          
        </div>
      </div>
    </div>
  );
}
