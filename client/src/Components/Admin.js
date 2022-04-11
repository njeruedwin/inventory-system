import React, { Component } from "react";
import "../css/admin.css";
import axios from "axios";
import Inventory_Manager from "../images/Inventory_Manager.webp";
import { getFromStorage } from "../utils/storage";
import RegisterPanel from "../Components/RegisterPanel";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logOut: false,
      signedIn: true,
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log("Component did mount");

    const obj = getFromStorage("Inventory_app");
    if (obj && obj.token) {
      const { token } = obj;
      //verify the token
      console.log(token);
      axios.get("/api/admin/verify?token=" + token).then((res) => {
        if (!res.data.success) {
          this.setState({
            logOut: true,
          });
        }

        console.log(this.state);
      });
    }
  }

  handleSignIn() {
    this.setState({
      signedIn: false,
    });
  }

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
          <div className="col-md-1"></div>
          {/*Middle Pane*/}
          <div className="col-md-10">
            <div className="content-area">
              <RegisterPanel />
            </div>
          </div>
          {/*Right Pane*/}
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}

export default Admin;
