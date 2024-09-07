import React from "react";
import {NavLink} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "../css/error.css";
const ErrorPage = () => {
  return (
    <>
      <section className="page_404" style={{display:"flex",justifyContent:"center",width:"100%"}}>
        <div className="container" style={{background:"white"}}>
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg" style={{display:"flex",justifyContent:"center",backgroundRepeat:"no-repeat"}}>
                  <h1 >404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 style={{display:"flex",justifyContent:"center"}}>Look like you're lost</h3>

                  <p style={{display:"flex",justifyContent:"center"}}>the page you are looking for not avaible!</p>
                  <div style={{display:"flex",justifyContent:"center"}}> <NavLink to="/home" className="link_404" >
                    Go to Home
                  </NavLink></div>
                 

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ErrorPage;
