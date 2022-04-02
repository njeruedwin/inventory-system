import React, { Component } from "react";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import { Redirect } from "react-router-dom";
import PanelNavbar from "../Components/PanelNavbar";
import Inventory_Manager from "../images/Inventory_Manager.webp";

import "../css/admin.css";
import axios from "axios";

class AddItemPanel extends Component {
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
              <ItemForm />
            </div>
          </div>
          {/*right Pane*/}
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}

class ItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: "",
      companyName: "",
      itemPrice: "",
      manufacteringDate: new Date(),
      expiryDate: "",
      quantity: "",

      formError: false,
      errorMessage: "",

      submit: false,
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.onManufacterDateChange = this.onManufacterDateChange.bind(this);
    this.onExpiryDateChange = this.onExpiryDateChange.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  onValueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onManufacterDateChange = (date, dateString) => {
    this.setState({
      manufacteringDate: dateString,
    });
  };

  onExpiryDateChange = (date, dateString) => {
    this.setState({
      expiryDate: dateString,
    });
  };

  submitData = () => {
    const item = this.state;
    console.log(item);

    axios.post("http://localhost:5000/api/admin/additem", item).then((res) => {
      if (!res.data.success) {
        return this.setState({
          errorMessage: res.data.message,
        });
      }

      this.setState({
        submit: true,
      });
    });
  };
  render() {
    if (this.state.submit) {
      return <Redirect to="/admin" />;
    }
    return (
      <>
        <PanelNavbar />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title main-font">
              Item Form : Register New Item
            </h3>
          </div>
          <div className="panel-body">
            <div>
              <form class="bs-example bs-example-form" role="form">
                <div class="input-group">
                  <div class="alert alert-danger">
                    <button
                      type="button"
                      class="close"
                      data-dismiss="alert"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                    Warning! For integrity purposes cannot update dates of
                    expiry and manufacter
                  </div>
                </div>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="itemName"
                    name="itemName"
                    onChange={this.onValueChange}
                  />
                  <span class="input-group-addon">@</span>
                </div>
                <br />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="company name"
                    name="companyName"
                    onChange={this.onValueChange}
                  />
                  <span class="input-group-addon">@</span>
                </div>
                <br />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="item price"
                    name="itemPrice"
                    onChange={this.onValueChange}
                  />
                  <span class="input-group-addon">@</span>
                </div>
                <br />
                <div class="input-group">
                  <div>
                    <DatePicker
                      placeholder="Date Of Manufacter"
                      size="large"
                      onChange={this.onManufacterDateChange}
                    />
                  </div>
                </div>
                <br />
                <div class="input-group">
                  <div>
                    <DatePicker
                      placeholder="Date Of expiry"
                      size="large"
                      onChange={this.onExpiryDateChange}
                    />
                  </div>
                </div>
                <br />
                <div class="input-group">
                  <span class="input-group-addon">Ksh</span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="quantity"
                    name="quantity"
                    onChange={this.onValueChange}
                  />
                  <span class="input-group-addon">.00</span>
                </div>
                <br />
                {this.state.errorMessage ? (
                  <div class="alert alert-danger">
                    {this.state.errorMessage}
                  </div>
                ) : (
                  ""
                )}
                <div className="input-group">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.submitData}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default AddItemPanel;
