import React, { Component } from "react";
import { Link } from "react-router-dom";

import PanelNavbar from "../Components/PanelNavbar";

//importing the printing components
import PrintReport from "../Components/printingcomponents/PrintReport";

//importing the table
import Table from "../Components/table/Table";

class RegisterPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <PanelNavbar />
        <Link to="/additem">
          <button type="button" className="mybtn btn btn-default ">
            Add item
            <span className="button-addon">+</span>
          </button>
        </Link>
        <br />
        <br />

        <PrintReport />
        <br />
        {/*table*/}
        <Table />
      </>
    );
  }
}

export default RegisterPanel;
