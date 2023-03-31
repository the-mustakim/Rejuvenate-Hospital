import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./style1.css";

import { toast } from "react-toastify";

export default function Contact(props) {
  const form = useRef();
  const { showAlert } = props;
  const [contactData, setcontactData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9krfglz",
        "template_wxmtvwc",
        form.current,
        "_3r8JuAfP5gl2lemd"
      )
      .then(
        (result) => {
          console.log(result.text);
          setcontactData({ user_name: "", user_email: "", message: "" });
          toast.success("Message has been Sent successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
        (error) => {
          console.log(error.text);
          //showAlert("We are Sorry Currently We Are Exprencing Very High Demand","danger")
          toast.error(
            "We are Sorry Currently We Are Exprencing Very High Demand!",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      );
  };

  const handleChange = (e) => {
    setcontactData({ ...contactData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container text-center contact">
        <h1 className="fs-1 fw-bold">Contact Us</h1>
        <h5 className="text-justify">
          At Rejuvenate Hospital, we are committed to providing excellent
          customer service and support. If you have any questions, comments, or
          concerns, we would love to hear from you. Contact Us by filling your
          details and one of our Engineers will be in touch.
        </h5>
        <div className="container-fluid pb-5">
          <div className="row m-auto">
            <div className="col-md-6 mb-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1890.835067864183!2d73.70362263237489!3d18.588904494854148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb7d0345f01f%3A0x6e8c20c647a06f47!2sSunbeam%20Infotech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1677411719382!5m2!1sen!2sin"
                style={{ border: 0, width: 600, height: 400 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-md-6 mb-5">
              <form ref={form} onSubmit={sendEmail}>
                <div className="form-group">
                  <div className="form-group">
                    <label htmlFor="name1"></label>
                    <input
                      name="user_name"
                      type="text"
                      className="form-control"
                      id="name1"
                      placeholder="Name"
                      value={contactData.user_name}
                      onChange={handleChange}
                    />
                  </div>
                  <label htmlFor="exampleInputEmail1"></label>
                  <input
                    name="user_email"
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={contactData.user_email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message1"></label>
                  <textarea
                    name="message"
                    className="form-control"
                    id="message1"
                    cols="30"
                    rows="4"
                    value={contactData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-success my-2">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
