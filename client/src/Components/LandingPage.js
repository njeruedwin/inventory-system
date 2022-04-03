import React, { Component } from "react";
import { Link } from "react-router-dom";
import Inventory_Manager from "../images/Inventory_Manager.webp";

class LandingPage extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${Inventory_Manager})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div className="container">
          {/*left Pane*/}
          <div className="col-md-3">
            <Link to="/signin">
              <button
                type="buttton"
                className="btn "
                style={{ marginTop: "20px" }}
              >
                Go To Admin Site
              </button>
            </Link>
            <br />
          </div>
          {/*right Pane*/}
          <div className="col-md-9">
            <div className="content-area">
              <CustomerContent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CustomerContent extends Component {
  render() {
    return (
      <div
        class="jumbotron"
        style={{
          backgroundColor: "rgb(255, 255, 255, 0.4)",
        }}
      >
        <div class="container">
          <h1
            style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
          >
            Welcome to Eddy Inventory Expiration Check Management System
          </h1>

          <p>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              data-toggle="collapse"
              data-target="#demo"
            >
              Learn More
            </button>{" "}
            <div id="demo" class="collapse">
              <h3>
                Eddy Inventory Management System in created to keep thing on
                track by identifying so as to be able to eliminate the items
                that are almost to go out of date and show already expired
                items.
              </h3>
              <h3>
                <p>
                  Eddy inventory Management System, keeping things on track!!.
                </p>
              </h3>
            </div>
          </p>
        </div>
      </div>
    );
  }
}

export default LandingPage;
