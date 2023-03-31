import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import hmsContext from "../../context/hmsContext";
import { toast } from 'react-toastify'

export default function EditUser() {

  const context = useContext(hmsContext);
  const { urecp, setUrecp, getUser,updateRecp, changeNavbar, changeNavbar2  } = context;
  const history = useHistory();


  useEffect(() => {
    async function fetch() {
      await getUser();
    }
    changeNavbar("Dashboard", "/AdminDashboard");
    changeNavbar2("AddUser", "/AddUser");
    fetch();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setUrecp((prevDoc) => ({
      ...prevDoc,
      [name]: value,
      address: {
        ...prevDoc.address,
        [name]: value,
      },
    }));
  };

  const handleClick = async(e) => {
    e.preventDefault();

   if( urecp.userId == "" ||
    urecp.firstName == "" ||
    urecp.lastName == "" ||
    urecp.email == "" ||
    urecp.age == "" ||
    urecp.gender == "" ||
    urecp.mobNo == "" ||
    urecp.salary == "" ||
    urecp.address.street == "" ||
    urecp.address.city == "" ||
    urecp.address.pincode == "")
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

    await updateRecp(
      urecp.userId,
      urecp.firstName,
      urecp.lastName,
      urecp.email,
      urecp.age,
      urecp.gender,
      urecp.mobNo,
      urecp.salary,
      urecp.address.street,
      urecp.address.city,
      urecp.address.pincode
    );

    history.push("/AdminDashboard");
  };

  return (
    <div className="container">
      <div style={{marginTop:100}}>
        <form className="row g-3">
          <div class="col-md-12">
            <center>
              <h2>Edit User Profile</h2>
            </center>
          </div>
          <div className="col-md-6">
            <label htmlFor="firstName" class="form-label">
              User ID
            </label>
            <input
              type="text"
              class="form-control"
              id="userId"
              name="userId"
              onChange={onChange}
              value={urecp.userId}
              required
              readOnly={true}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName" class="form-label">
              Receptionist First Name
            </label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              onChange={onChange}
              value={urecp.firstName}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName" class="form-label">
              Receptionist Last Name
            </label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              name="lastName"
              onChange={onChange}
              value={urecp.lastName}
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
              value={urecp.email}
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
              value={urecp.age}
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
              value={urecp.gender}
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
              value={urecp.salary}
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
              value={urecp.mobNo}
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
              value={urecp.address.street}
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
              value={urecp.address.city}
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
              value={urecp.address.pincode}
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
