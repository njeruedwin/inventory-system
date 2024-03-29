import React, { Component } from "react";
import LandingPage from "./LandingPage";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { getFromStorage } from "../utils/storage";

import {environment} from '../environment/environment.prod'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      isLoading: true,
    };

    this.API = environment.API;
    
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    console.log("Component did mount");

    const obj = getFromStorage("Inventory_app");
    if (obj && obj.token) {
      const { token } = obj;
      //verify the token
      console.log(token);
      axios.get(`${this.API}/api/admin/verify?token=` + token).then((res) => {
        if (res.data.success) {
          this.setState({
            signedIn: true,
            isLoading: false,
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
    const { signedIn } = this.state;

    return signedIn ? <Redirect to="/admin" /> : <LandingPage />;
  }
}

export default App;
