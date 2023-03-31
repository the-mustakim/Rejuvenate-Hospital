import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import herobg from "../images/herobg.jpg";
import Cardiology from "../images/Cardiology.jpg";
import Neurology from "../images/Neurology.jpg";
import Hepatology from "../images/Hepatology.jpg";
import Pediatrics from "../images/Pediatrics.jpg";
import EyeCare from "../images/EyeCare.jpg";
import about from "../images/about.jpg";
import doctorIcon from "../images/icons/doctorIcon.png";
import hospitalIcon from "../images/icons/hospitalIcon.png";
import medalIcon from "../images/icons/medalIcon.png";
import resultIcon from "../images/icons/resultIcon.png";
import doctors1 from "../images/doctors/doctors1.jpg";
import doctors2 from "../images/doctors/doctors2.jpg";
import doctors3 from "../images/doctors/doctors3.jpg";
import doctors4 from "../images/doctors/doctors4.jpg";
import doctors5 from "../images/doctors/doctors5.jpg";
import doctors6 from "../images/doctors/doctors6.jpg";
import gallery1 from "../images/gallery/gallery1.jpg";
import gallery2 from "../images/gallery/gallery2.jpg";
import gallery3 from "../images/gallery/gallery3.jpg";
import gallery4 from "../images/gallery/gallery4.jpg";
import gallery5 from "../images/gallery/gallery5.jpg";
import gallery6 from "../images/gallery/gallery6.jpg";
import gallery7 from "../images/gallery/gallery7.jpg";
import gallery8 from "../images/gallery/gallery8.jpg";

import "../css/HomePage.css";

export default function Home() {
  const [Departments, setDepartments] = useState({
    Name: "Cardiology",
    Content:
      "Our cardiology department offers comprehensive care for patients with heart conditions, including advanced diagnostic testing, non-invasive procedures, and surgical interventions. Our team of cardiac specialists is committed to providing the highest level of care to our patients with heart disease.",
    ImageName: Cardiology,
  });
  useEffect(() => {
  }, [Departments])
  

  const handleChange = (e) => {
    switch (e.target.id) {
      case "Cardiology":
        setDepartments({
          Name: "Cardiology",
          Content:
            "Our cardiology department offers comprehensive care for patients with heart conditions, including advanced diagnostic testing, non-invasive procedures, and surgical interventions. Our team of cardiac specialists is committed to providing the highest level of care to our patients with heart disease.",
          ImageName: Cardiology,
        });
        break;
      case "Neurology":
        setDepartments({
          Name: "Neuro",
          Content:
            "Our neurology department provides care for patients with neurological disorders, including stroke, epilepsy, and Parkinson's disease. We offer advanced diagnostic testing and treatment options, and our team of neurologists and nurses are committed to delivering personalized care to each patient.",
          ImageName: Neurology,
        });
        break;
      case "Hepatology":
        setDepartments({
          Name: "Hepatology",
          Content:
            "Our hepatology department offers specialized care for patients with liver diseases, including hepatitis, cirrhosis, and liver cancer. Our team of hepatologists and nurses are experienced in managing complex liver conditions and providing patients with the latest treatment options.",
          ImageName: Hepatology,
        });
        break;
      case "Pediatrics":
        setDepartments({
          Name: "Pediatrics",
          Content:
            "Our pediatrics department provides care for infants, children, and adolescents with a range of medical conditions. Our team of pediatricians and nurses are trained in delivering age-appropriate care and providing a family-centered approach to treatment",
          ImageName: Pediatrics,
        });
        break;
      case "EyeCare":
        setDepartments({
          Name: "Eye Care",
          Content:
            "Our eye care department offers comprehensive care for patients with a range of eye conditions, including cataracts, glaucoma, and retinal diseases. Our team of ophthalmologists and optometrists are experienced in delivering advanced diagnostic testing and treatment options for patients with eye disorders.",
          ImageName: EyeCare,
        });
        break;
    }
  };
  return (
    <>
      {/* header */}
      <div
        className="container-fluid pt-5"
        style={{ backgroundImage: `url(${herobg})`, height: "600px" }}
      >
        <div className="row mt-5">
          <div className="col-md-6 mb-5 text-center">
            <h1 className="Heading">Welcome to Rejuvenate Hospital</h1>
            <h5>
              <p>Your Journey to Wellness Starts Here</p>
            </h5>
            <Link role="button" to="/login">
              <button type="button" className="mt-5 HomeBtn">
                GET STARTED
              </button>
            </Link>
          </div>
          <div className="col-md-6 mb-5 text-center closUp">
            <img src={doctors1} alt="doctors1" className="doctors1" />
          </div>
        </div>
      </div>

      <section className="MySection">
        <div className="row m-auto">
          <div className="col-md- mb-5 my-2 mx-3 WhyHms">
            <h2 className="mytext">Why Choose Rejuvenate Hospital?</h2>
            <p className="mytext">
              Our experienced healthcare professionals offer a comprehensive
              range of services, from routine check-ups to specialized
              treatments and surgeries. With a focus on patient education and
              empowerment, we're committed to providing high-quality care in a
              comfortable and welcoming environment. Choose Rejuvenate Hospital
              for convenient, quality healthcare.
            </p>
            <button className="mybtn">Learn More</button>
          </div>
          <div className="col-md-4 mb-5  my-2 mx-3 shadow-lg p-3 mb-5 bg-white rounded SampleCard">
            <div></div>
            <h5 className="mytext2 fw-bold">Patient-Centered Care</h5>
            <p className="mytext2">
              At Rejuvenate Hospital, we believe that healthcare should be
              centered around the patient. We take the time to get to know each
              patient and develop personalized treatment plans to meet their
              unique needs.
            </p>
          </div>
          <div className="col-md-4 mb-5  my-2 mx-3 shadow-lg p-3 mb-5 bg-white rounded SampleCard">
            <h5 className="mytext2 fw-bold">
              Experienced Healthcare Professionals
            </h5>
            <p className="mytext2">
              Our team of experienced healthcare professionals is dedicated to
              providing high-quality care to our patients. From our physicians
              and nurses to our support staff, everyone at Rejuvenate Hospital
              is committed to your health and well-being.
            </p>
          </div>
          <div className="col-md-4 mb-5 my-2 mx-3 shadow-lg p-3 mb-5 bg-white rounded SampleCard">
            <h5 className="mytext2 fw-bold">State-of-the-Art Facilities</h5>
            <p className="mytext2">
              We use the latest technologies and techniques to provide safe and
              effective medical care to our patients. Our state-of-the-art
              facilities are designed to provide a comfortable and welcoming
              environment for our patients.
            </p>
          </div>
          <div className="col-md-4 mb-5 my-2 mx-3 shadow-lg p-3 mb-5 bg-white rounded SampleCard">
            <h5 className="mytext2 fw-bold">Comprehensive Services</h5>
            <p className="mytext2">
              At Rejuvenate Hospital, we offer a wide range of services to meet
              the diverse needs of our patients. Whether you're in need of
              routine medical care or specialized treatment, we're here to help.
            </p>
          </div>
        </div>
      </section>

      <div className="container-fluid" id="About">
        <div className="row m-auto">
          <div className="col-md-6 mb-5">
            <a href="/">
              <img className="img-fluid" src={about} alt="HomeBack1" />
            </a>
          </div>
          <div className="col-md-6 mb-5">
            <h2 className="fs-1 fw-bold">About Us</h2>
            <br />
            <h4>
              At Rejuvenate Hospital, our mission is to provide exceptional
              medical care and outstanding patient experiences. Here's what sets
              us apart
            </h4>
            <div className="row m-auto">
              <div class="alert alert-light myAlert" role="alert">
                <h4>
                  Our History
                </h4>
                <p>
                Rejuvenate Hospital has been a trusted provider of healthcare services for over 50 years. We have a rich history of serving our community and delivering high-quality care to our patients.
                </p>
              </div>
              <div className="alert alert-light myAlert" role="alert">
                <h4>
                Our Trust
                </h4>
                <p>
                Rejuvenate Hospital is proud to be a member of the XYZ Trust, a leading healthcare provider with a commitment to excellence in patient care. Our affiliation with the trust allows us to leverage the collective expertise of some of the most respected healthcare organizations in the world.
                </p>
              </div>
              <div className="alert alert-light myAlert" role="alert">
                <h4>
                Our Commitment
                </h4>
                <p>
                At Rejuvenate Hospital, we are committed to putting our patients first. We strive to create a warm and welcoming environment, where patients feel comfortable and confident in their care. Our goal is to make your experience with us as pleasant and stress-free as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="container-fluid pt-5">
          <div className="row m-auto mt-4 rowColor">
            <div className="col-md-3 text-center my-5">
              <img
                src={doctorIcon}
                alt=""
                className="img-fluid my-2"
                style={{ width: 50 }}
              />
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title">85</h1>
                  <p className="card-text">Doctors</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center mb-5 my-5">
              <img
                src={hospitalIcon}
                alt=""
                className="img-fluid my-2"
                style={{ width: 50 }}
              />
              <div className="card">
                <div className="card">
                  <div className="card-body">
                    <h1 className="card-title">18</h1>
                    <p className="card-text">Departments</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center mb-5 my-5">
              <img
                src={resultIcon}
                alt=""
                className="img-fluid my-2"
                style={{ width: 50 }}
              />
              <div className="card">
                <div className="card">
                  <div className="card-body">
                    <h1 className="card-title">15</h1>
                    <p className="card-text">Research Labs</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center mb-5 my-5">
              <img
                src={medalIcon}
                alt=""
                className="img-fluid my-2"
                style={{ width: 50 }}
              />
              <div className="card">
                <div className="card">
                  <div className="card-body">
                    <h1 className="card-title">150</h1>
                    <p className="card-text">Awards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our services */}

      <div className="container" id="services">
        <div className="container-fluid pt-5">
          <div className="row m-auto">
            <div className="col-md-12 text-center">
              <h2 className="fw-bold">Services</h2>
            </div>
            <div className="text-center">
              At Rejuvenate Hospital, we are committed to providing high-quality
              healthcare services to all of our patients. We offer a wide range
              of services to meet the unique needs of each individual.
            </div>
          </div>
          <div className="row m-auto mt-4">
            <div className="col-md-4 text-center my-5">
              <div class="card hover-color" style={{ height: 350 }}>
                <div className="serviceIcon">
                  <i className="fa-solid fa-heart-pulse"></i>
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    Advanced Heart Equipment Facility
                  </h5>
                  <p className="card-text">
                    At Rejuvenate Hospital, Our advanced heart equipment
                    facility includes a range of cutting-edge equipment, such as
                    advanced imaging technology, cardiac catheterization labs,
                    and non-invasive testing equipment. These tools allow us to
                    diagnose and treat heart conditions with greater accuracy
                    and precision
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-5 my-5">
              <div class="card hover-color" style={{ height: 350 }}>
                <div className="serviceIcon">
                  <i className="fa-sharp fa-solid fa-capsules"></i>
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">In-House Medical</h5>
                  <p className="card-text">
                    Rejuvenate Hospital offers an in-house medicines facility
                    with licensed pharmacists who accurately dispense and track
                    medications. Our pharmacists also provide medication
                    counseling to ensure that our patients understand the
                    benefits and potential side effects of their medications.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-5 my-5">
              <div class="card hover-color" style={{ height: 350 }}>
                <div className="serviceIcon">
                  <i className="fa-solid fa-wheelchair-move"></i>
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">Wheelchair Facility</h5>
                  <p className="card-text">
                    Rejuvenate Hospital is committed to providing accessible
                    healthcare to all of our patients, including those with
                    mobility impairments. That's why we offer a wheelchair
                    facility as a service to our patients. Our wheelchair
                    facility includes a fleet of high-quality wheelchairs that
                    are available for use by our patients during their visit to
                    our hospital.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" id="Departments">
        <div className="container-fluid pt-5">
          <div className="row m-auto">
            <div className="col-md-12 text-center">
              <h2 className="fw-bold">Departments</h2>
            </div>
            <div className="text-center">
              At Rejuvenate Hospital, we have a team of dedicated healthcare
              professionals working across a range of departments to provide
              high-quality care to our patients. Each department is staffed by
              experienced professionals who are committed to delivering
              personalized, patient-centered care.
            </div>
          </div>
          <div className="row m-auto mt-4">
            <div className="col-md-3 text-center my-5 text-left">
            <div
                className={`row m-auto mt-4 ${
                  Departments.Name === "Cardiology" ? "active" : ""
                } pointer-cursor`}
                onClick={handleChange}
                id="Cardiology"
              >
                Cardiology
              </div>
              <div
                className={`row m-auto mt-4 ${
                  Departments.Name === "Neurology" ? "active" : ""
                } pointer-cursor`}
                onClick={handleChange}
                id="Neurology"
              >
                Neurology
              </div>
              <div
                className={`row m-auto mt-4 ${
                  Departments.Name === "Hepatology" ? "active" : ""
                } pointer-cursor`}
                onClick={handleChange}
                id="Hepatology"
              >
                Hepatology
              </div>
              <div
                className={`row m-auto mt-4 ${
                  Departments.Name === "Pediatrics" ? "active" : ""
                } pointer-cursor`}
                onClick={handleChange}
                id="Pediatrics"
              >
                Pediatrics
              </div>
              <div
                className={`row m-auto mt-4 ${
                  Departments.Name === "EyeCare" ? "active" : ""
                } pointer-cursor`}
                onClick={handleChange}
                id="EyeCare"
              >
                Eye Care
              </div>
            </div>
            <div className="col my-5 mycol">
              <div className="vertical-line"></div>
            </div>
            <div className="col-md-3 mx-6">
              <h2 className="font-weight-bold">{Departments.Name}</h2>
              <p className="text-justify">{Departments.Content}</p>
            </div>
            <div className="col-md-4 text-center mb-5 my-5">
              <img
                src={Departments.ImageName}
                alt={`${Departments.ImageName}`}
                className="img-thumbnail depImg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Doctors */}
      <div className="container" id="Team">
        <div className="container-fluid pt-5">
          <div className="row m-auto">
            <div className="col-md-12 text-center">
              <h2 className="fw-bold">Doctors</h2>
            </div>
            <div className="text-center">
              At Rejuvenate Hospital, we have a team of experienced and skilled
              doctors who are committed to providing the highest quality of care
              to our patients. Our team includes specialists across a range of
              medical fields, who are dedicated to delivering personalized,
              patient-centered care.
            </div>
          </div>
          <div className="row m-auto mt-4">
            <div className="col-md-4 text-center my-5">
              <div className="card">
                <center>
                  <img
                    className="img-fluid doctorsImg my-2"
                    src={doctors1}
                    alt="doctors1"
                  />
                </center>
                <div className="card-body" style={{ height: 350 }}>
                  <h5 className="card-title">Dr. John Lee</h5>
                  <p>Chief Medical Officer</p>
                  <p className="card-text">
                    Dr. Lee is the Chief Medical Officer at Rejuvenate Hospital
                    and a highly skilled neurologist. He is committed to
                    delivering patient-centered care and maintaining the highest
                    standards of medical excellence. As a leading member of the
                    hospital's medical team, Dr. Lee oversees the hospital's
                    staff.
                  </p>
                  <div className="container row d-flex justify-content-center align-items-end pb-3 myicons">
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-twitter"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-square-instagram"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-facebook"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-linkedin"></i>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-5 my-5">
              <div className="card">
                <center>
                  <img
                    className="img-fluid doctorsImg my-2"
                    src={doctors2}
                    alt=""
                  />
                </center>
                <div className="card-body" style={{ height: 350 }}>
                  <h5 className="card-title">Dr. Jane Smith</h5>
                  <p>Cardiologist</p>
                  <p className="card-text">
                    Dr. Smith is a board-certified cardiologist with over 15
                    years of experience. She is dedicated to providing
                    personalized care to each of her patients and uses advanced
                    imaging technologies and treatment options to achieve the
                    best possible outcomes.
                  </p>
                  <div className="container row d-flex justify-content-center myicons">
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-twitter"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-square-instagram"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-facebook"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-linkedin"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-5 my-5">
              <div className="card">
                <center>
                  <img
                    className="img-fluid doctorsImg  mx-2 my-2"
                    src={doctors3}
                    alt=""
                  />
                </center>
                <div className="card-body" style={{ height: 350 }}>
                  <h5 className="card-title">Dr. David Kim</h5>
                  <p>Pediatrician</p>
                  <p className="card-text">
                    Dr. Kim is a dedicated pediatrician with expertise in the
                    care of infants, children, and adolescents. He provides
                    comprehensive medical care, including preventive care,
                    vaccinations, and management of acute and chronic illnesses,
                    and is committed to delivering compassionate care to patients.
                  </p>
                  <div className="container row d-flex justify-content-center myicons">
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-twitter"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-square-instagram"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-facebook"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-linkedin"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row m-auto mt-4">
            <div className="col-md-4 text-center my-5">
              <div className="card">
                <center>
                  <img
                    className="img-fluid doctorsImg  mx-2 my-2"
                    src={doctors4}
                    alt=""
                  />
                </center>
                <div className="card-body" style={{ height: 350 }}>
                  <h5 className="card-title">Dr. Lisa Patel</h5>
                  <p>Hepatologist</p>
                  <p className="card-text">
                    Dr. Patel is a skilled hepatologist with expertise in the
                    diagnosis and treatment of liver diseases. She uses a
                    patient-centered approach to care and works closely with
                    other specialists to provide the most effective treatment
                    options for her patients and help them.
                  </p>
                  <div className="container row d-flex justify-content-center myicons">
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-twitter"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-square-instagram"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-facebook"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-linkedin"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-5 my-5">
              <div className="card">
                <center>
                  <img
                    className="img-fluid doctorsImg  mx-2 my-2"
                    src={doctors5}
                    alt=""
                  />
                </center>
                <div className="card-body" style={{ height: 350 }}>
                  <h5 className="card-title">Dr. Michael Brown</h5>
                  <p>Ophthalmologist</p>
                  <p className="card-text">
                    Dr. Brown is an experienced ophthalmologist with expertise
                    in the diagnosis and treatment of a range of eye conditions.
                    He is committed to delivering personalized care to each of
                    his patients and uses advanced surgical and non-surgical
                    treatments to achieve the best possible outcomes.
                  </p>
                  <div className="container row d-flex justify-content-center myicons">
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-twitter"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-square-instagram"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-facebook"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-linkedin"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-5 my-5">
              <div className="card">
                <center>
                  <img
                    className="img-fluid doctorsImg  mx-2 my-2"
                    src={doctors6}
                    alt=""
                  />
                </center>
                <div className="card-body" style={{ height: 350 }}>
                  <h5 className="card-title">Dr. Ryan Johnson</h5>
                  <p>Oncologist</p>
                  <p className="card-text">
                    Dr. Johnson is an experienced oncologist who specializes in
                    the diagnosis and treatment of cancer. He uses a
                    multi-disciplinary approach to cancer care and is committed
                    to delivering compassionate care to each of his patients as well making sure the patient remains always happy.
                  </p>
                  <div className="container row d-flex justify-content-center myicons">
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-twitter"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-square-instagram"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-facebook"></i>
                    </div>
                    <div className="col-3 mx-3 socialMedia">
                      <i className="fa-brands fa-linkedin"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frquently Asked Questions */}
      <section className="MySection2" id="FAQ">
        <div className="container">
          <div className="row m-auto">
            <div className="col-md-12 text-center my-3">
              <h2 className="fw-bold">Frequently Asked Questions</h2>
            </div>
            <div className="text-center">
              We understand that you may have questions about our hospital and
              services. Here are answers to some of our most frequently asked
              questions
            </div>
          </div>
          <div className="row m-auto mt-4">
            <div className="container">
              <div className="accordion" id="accordionExample">
                <div>
                  <i class="fa-solid fa-location-question"></i>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <strong>How do I prepare for a medical procedure?</strong>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Your doctor will provide you with specific instructions
                      for preparing for your procedure. This may include fasting
                      or modifying your medications. Please follow these
                      instructions carefully to ensure the best possible
                      outcomes.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <strong>How do I access my medical records?</strong>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      You can access your medical records through our secure
                      patient portal. If you have any questions or concerns
                      about your medical records, please contact our medical
                      records team.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <strong>What should I bring to my appointment?</strong>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Please bring your insurance card, photo ID, and any
                      relevant medical records or test results. You may also
                      want to bring a list of questions or concerns you have
                      about your health.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <div className="row m-auto my-4" id="Gallary">
        <div className="col-md-12 text-center">
          <h2 className="fw-bold">Gallery</h2>
        </div>
        <div className="text-center">
          Explore our hospital facilities and amenities through our photo
          gallery.
        </div>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3 mb-5">
            <a href="/">
              <img className="img-fluid" src={gallery1} alt="HomeBack1" />
            </a>
          </div>
          <div className="col-md-3 mb-5">
            <a href="/">
              <img className="img-fluid" src={gallery2} alt="HomeBack1" />
            </a>
          </div>
          <div className="col-md-3 mb-5">
            <a href="/">
              <img className="img-fluid" src={gallery3} alt="HomeBack1" />
            </a>
          </div>
          <div className="col-md-3 mb-5">
            <a href="/">
              <img className="img-fluid" src={gallery4} alt="HomeBack1" />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-5">
            <a href="/">
              <img className="img-fluid" src={gallery5} alt="HomeBack1" />
            </a>
          </div>
          <div className="col-md-3 mb-5">
            <a href="/">
              <img className="img-fluid" src={gallery6} alt="HomeBack1" />
            </a>
          </div>
          <div className="col-md-3 mb-5">
            <a href="/">
              <img className="img-fluid" src={gallery7} alt="HomeBack1" />
            </a>
          </div>
          <div className="col-md-3 mb-5">
            <a href="/">
              <img className="img-fluid" src={gallery8} alt="HomeBack1" />
            </a>
          </div>
        </div>
      </div>

      <div className="container" style={{marginBottom:50}}>

      </div>
    </>
  );
}
