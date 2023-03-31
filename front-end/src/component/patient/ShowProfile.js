import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function ShowProfile() {
  const host = process.env.REACT_APP_HOST_LOCATION;
  const history = useHistory();

  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    mobNo: "",
    salary: "0",
    role: "ROLE_PATIENT",
    securityQuestion: "",
    securityAnswer: "",
    address: {
      street: "",
      city: "",
      pincode: "",
    },
    bloodGroup: "",
    medicalHistory: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        `${host}/patient/getPatient/${localStorage.getItem("user_id")}`,
        options
      )
      .then(
        (response) => {
          setPatient(response.data.user);
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  }, []);

  const handleClick = (e) => {
    history.push("/EditPatient");
  };
  return (
    <>
      <div className="container">
        <div className="row" style={{ marginTop: 100 }}>
          <div className="col d-flex justify-content-center fw-bold">
            <h2>My Profile</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row my-3">
              <div className="col d-flex justify-content-center">
                <div class="form-group">
                  <label for="FirstName">First Name</label>
                  <input
                    readOnly={true}
                    type="text"
                    class="form-control"
                    id="FirstName"
                    aria-describedby="emailHelp"
                    style={{ width: 300 }}
                    value={patient.firstName}
                  />
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col d-flex justify-content-center">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input
                    readOnly={true}
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    style={{ width: 300 }}
                    value={patient.email}
                  />
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col d-flex justify-content-center">
                <div class="form-group">
                  <label for="Age">Age</label>
                  <input
                    readOnly={true}
                    type="text"
                    class="form-control"
                    id="Age"
                    aria-describedby="emailHelp"
                    style={{ width: 300 }}
                    value={patient.age}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <div class="form-group">
                  <label for="MoNo">Mobile No</label>
                  <input
                    readOnly={true}
                    type="text"
                    class="form-control"
                    id="MoNo"
                    aria-describedby="emailHelp"
                    style={{ width: 300 }}
                    value={patient.mobNo}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row my-3">
              <div className="col d-flex justify-content-center">
                <div class="form-group">
                  <label for="LastName">Last Name</label>
                  <input
                    readOnly={true}
                    type="text"
                    class="form-control"
                    id="LastName"
                    aria-describedby="emailHelp"
                    style={{ width: 300 }}
                    value={patient.lastName}
                  />
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col d-flex justify-content-center">
                <div class="form-group">
                  <label for="gender">Gender</label>
                  <input
                    readOnly={true}
                    type="text"
                    class="form-control"
                    id="gender"
                    aria-describedby="emailHelp"
                    style={{ width: 300 }}
                    value={patient.gender}
                  />
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col d-flex justify-content-center">
                <div class="form-group">
                  <label for="Address">Address</label>
                  <input
                    readOnly={true}
                    type="text"
                    class="form-control"
                    id="Address"
                    aria-describedby="emailHelp"
                    style={{ width: 300 }}
                    value={patient.address.street+ " " +patient.address.city}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <div class="form-group">
                  <label for="Pincode">Pincode</label>
                  <input
                    readOnly={true}
                    type="text"
                    class="form-control"
                    id="Pincode"
                    aria-describedby="emailHelp"
                    style={{ width: 300 }}
                    value={patient.address.pincode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: 100 }}>
          <div className="col d-flex justify-content-center fw-bold">
            <button className="btn btn-primary" onClick={handleClick}>Edit Profile</button>
          </div>
        </div>
      </div>
      <div style={{marginBottom:300}}>
          
      </div>
    </>
  );
}
