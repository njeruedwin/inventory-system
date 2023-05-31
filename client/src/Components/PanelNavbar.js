import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { getFromStorage } from "../utils/storage";
import axios from "axios";

class PanelNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logOut: false,
      signedIn: true,
      isLoading: true,
    };

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    console.log("log out");
    const obj = getFromStorage("Inventory_app");
    const { token } = obj;
    axios.get("/api/admin/logout?token=" + token).then((res) => {
      if (res.data.success) {
        this.setState({
          logOut: true,
        });
      }
      console.log(res.data.message);
      this.setState({
        isLoading: false,
      });

      console.log(this.state.logOut);
    });
  }

  render() {
    const { logOut } = this.state;
    if (logOut) {
      return <p>{<Redirect to="/" />}</p>;
    }
    return (
      <nav class="navbar navbar-default " role="navigation">
        <div>
          <ul class="nav navbar-nav">
            <li>
              <Link to="/admin">
                <span style={{ textDecoration: "none" }}>Register Panel</span>
              </Link>
            </li>

            <li>
              <span></span>
            </li>

            <li>
              <Link to="/additem">
                <span style={{ textDecoration: "none" }}>
                  Add Item Panel
                </span>
              </Link>
            </li>
            <li style={{ display: "flex", paddingLeft: "550px" }}>
              <span style={{ textDecoration: "none" }} onClick={this.handleLogOut}>
                Log Out
              </span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default PanelNavbar;
