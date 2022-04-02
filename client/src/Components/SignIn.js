import React, { Component } from "react";
import "../css/signIn.css";
import Admin from "./Admin";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Inventory_Manager from "../images/Inventory_Manager.webp";
import { setInStorage } from "../utils/storage";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",

      signInError: "",
      signedIn: false,
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);

    this.submitData = this.submitData.bind(this);
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleUsernameChange(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  submitData(event) {
    event.preventDefault();
    const { userName, password } = this.state;

    const data = {
      userName,
      password,
    };

    axios.post("http://localhost:5000/api/admin/signIn", data).then((res) => {
      const { success, message, token } = res.data;
      if (!success) {
        return this.setState({
          signInError: message,
        });
      }
      setInStorage("Inventory_app", { token: token });
      this.setState({
        signedIn: true,
        userName: "",
        password: "",
      });
    });

    console.log(this.state);
  }

  render() {
    const { password, signedIn, signInError } = this.state;
    if (signedIn) {
      //remainder:change signedUp state back to false
      return <Redirect to="/admin" />;
    }
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
          <div>
            <div className="col-md-4"></div>
            <div>
              <form
                className="my-form jumbotron form-horizontal"
                style={{
                  marginTop: "150px",
                  width: "500px",
                  marginLeft: "300px",
                  backgroundColor: "rgb(255, 255, 255, 0.4)",
                  paddingTop: "20px",
                }}
                role="form"
              >
                <div className="form-group">
                  <label for="firstname" className="control-label">
                    username
                  </label>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter username"
                      onChange={this.handleUsernameChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label for="lastname" className=" control-label">
                    password
                  </label>
                  <div>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      onChange={this.handlePasswordChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  {signInError ? (
                    <div class="alert alert-danger ">{signInError}</div>
                  ) : null}
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={this.submitData}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
