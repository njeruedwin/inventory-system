import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import SignIn from "./Components/SignIn";
import RegisterAdmin from "./Components/RegisterAdmin";
import AddItemPanel from "./Components/AddItemPanel";
import Admin from "./Components/Admin";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/signin" component={SignIn} />
      <Route path="/admin" component={Admin} />
      <Route path="/registeradmin" component={RegisterAdmin} />
      <Route path="/additem" component={AddItemPanel} />
    </Switch>
  </Router>,

  document.getElementById("root")
);
