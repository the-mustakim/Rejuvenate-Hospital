import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ShowPatients from "./ShowPatients";
import ViewAppointment from "./ViewAppointment";
import HeadingHospital from '../../images/Dashboards/HeadingHospital.jpg'
import OurPharmacist from '../../images/Dashboards/OurPharmacist.jpg'
import OurNurses from '../../images/Dashboards/OurNurses.jpg'
import OurDoctors from '../../images/Dashboards/OurDoctors.jpg'


import hmsContext from "../../context/hmsContext";

export default function DoctorDashboard(props) {
  const context = useContext(hmsContext);
  const { changeNavbar, changeNavbar2 } = context;

  useEffect(() => {
    changeNavbar("Dashboard", "/DoctorDashboard");
    changeNavbar2("View Patient", "/showPatients");
  }, []);

  return (
    <>
      {/* header */}
      <img src={HeadingHospital} className="img-fluid" alt="HeadingHospital" />
      {/* <div className="container">
      <div className="container">
        <div className="container-fluid pt-5">
          <div className="row m-auto">
            <div className="col-md-12 text-center">
              <h2 className="fw-bold">Our Team</h2>
            </div>
            <div className="text-center">
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur
              ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
              quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
              Quia fugiat sit in iste officiis commodi quidem hic quas.
            </div>
          </div>
          <div className="row m-auto mt-4">
            <div className="col-md-4 text-center my-5">
              <div class="card hover-color">
                <img src={OurDoctors} alt="OurDoctors" className="img-fluid" style={{height:252}} />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-5 my-5">
              <div class="card hover-color">
              <img src={OurNurses} alt="OurNurses" className="img-fluid" style={{height:252}} />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-5 my-5">
              <div class="card hover-color">
              <img src={OurPharmacist} alt="OurPharmacist" className="img-fluid" style={{height:252}} />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div> */}
    </>
  );
}
