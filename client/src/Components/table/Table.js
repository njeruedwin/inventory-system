import React, { Component } from "react";
import axios from "axios";

import { environment } from "../../environment/environment.prod";

class Table extends Component {
  constructor() {
    super();

    this.state = {
      deleteButtonClicked: false,
      items: [],
      deleteItem: [],
      deleteItemId: 0,

      //For Update Purposes
      itemName: "",
      companyName: "",
      itemPrice: "",
      manufacteringDate: "",
      expiryDate: "",
      quantity: "",
      updated: false,
    };

    this.API = environment.API;

    this.registerTable = this.registerTable.bind(this);
    this.calculateDaysLeft = this.calculateDaysLeft.bind(this);
    this.groupButtons = this.groupButtons.bind(this);
    this.deleteModal = this.deleteModal.bind(this);

    this.onManufacterDateChange = this.onManufacterDateChange.bind(this);
    this.onExpiryDateChange = this.onExpiryDateChange.bind(this);

    this.setTableToDelete = this.setTableToDelete.bind(this);
    this.setDataToUpdate = this.setDataToUpdate.bind(this);
    this.getTableToDelete = this.getTableToDelete.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.updateModal = this.updateModal.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    //this.carReady = this.carReady.bind(this);
  }

  componentDidMount(){
    console.log("Table component has mounted");
    axios.get(`${this.API}/api/admin/getItems`).then((res) => {
      this.setState({
        items: res.data,
      });
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.updated !== this.state.updated) {
      console.log("Table component has updated");
      axios.get(`${this.API}/api/admin/getItems`).then((res) => {
        this.setState({
          items: res.data,
        });
      });
    }
  };

  registerTable = () => {
    return this.state.items.map((item) => {
      return (
        <tr key={item._id}>
          <td>{item.itemName}</td>
          <td>{item.companyName}</td>
          <td>{item.itemPrice}</td>
          <td>{item.manufacteringDate}</td>
          <td>{item.expiryDate}</td>
          <td>{item.quantity}</td>
          <td>{this.calculateDaysLeft(item.expiryDate)}</td>

          <td>{this.groupButtons(item._id)}</td>
        </tr>
      );
    });
  };

  calculateDaysLeft = (doe) => {
    const todayDate = new Date(new Date().toDateString());
    const dateDoe = new Date(doe);

    const diffInMs = Math.abs(dateDoe - todayDate);
    const daysLeft = diffInMs / (1000 * 60 * 60 * 24);
    if (todayDate.getTime() > dateDoe.getTime()) {
      return <span style={{ color: "red" }}>expired</span>;
    }

    if (daysLeft > 1 && daysLeft <= 20) {
      return <span style={{ color: "red" }}>{Math.floor(daysLeft)} days</span>;
    }
    if (daysLeft > 20) {
      return (
        <span style={{ color: "green" }}>{Math.floor(daysLeft)} days </span>
      );
    }
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

  groupButtons = (id) => {
    return (
      <div className="btn-group">
        {this.deleteModal(this.state.deleteItemId)}
        {this.updateModal(id)}
        <button
          type="button"
          className="btn btn-default"
          data-toggle="modal"
          data-target="#updatemodal"
          onClick={() => this.setDataToUpdate(id)}
        >
          edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#deletemodal"
          onClick={() => this.setTableToDelete(id)}
        >
          Delete
        </button>
      </div>
    );
  };

  deleteModal = (id) => {
    return (
      <div>
        <div
          class="modal fade"
          id="deletemodal"
          tabindex="3"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                  Delete Item
                </h4>
              </div>
              <div class="modal-body ">
                <div class="alert alert-danger">
                  Caution ! Are You sure you want to delete the record
                </div>
                <div className="table-responsive">
                  <table className="table table-stripped">
                    <thead>
                      <th>Item Name</th>
                      <th>Company Name</th>
                      <th>price</th>
                      <th>Manufactering Date</th>
                      <th>Expiry Date</th>
                      <th>Quantity</th>
                    </thead>
                    <tbody>{this.getTableToDelete()}</tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-danger"
                  onClick={() => this.deleteRecord(id)}
                >
                  delete record
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  updateModal = (id) => {
    return (
      <div>
        <div
          class="modal fade"
          id="updatemodal"
          tabindex="3"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                  Update Item
                </h4>
              </div>
              <div class="modal-body ">
                <div>
                  <div class="bs-example bs-example-form" role="form">
                    <div class="input-group">
                      <div class="alert alert-info">
                        <button
                          type="button"
                          class="close"
                          data-dismiss="alert"
                          aria-hidden="true"
                        >
                          &times;
                        </button>
                        Info! Cannot update Dates
                      </div>
                    </div>
                    <label>Item Name</label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="item name"
                        name="itemName"
                        value={this.state.itemName}
                        onChange={this.updateValue}
                      />

                      <span class="input-group-addon">@</span>
                    </div>
                    <br />
                    <label>Company Name</label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="company name"
                        name="companyName"
                        value={this.state.companyName}
                        onChange={this.updateValue}
                      />
                      <span class="input-group-addon">@</span>
                    </div>
                    <br />

                    <label>Item Price</label>
                    <div class="input-group">
                      <span class="input-group-addon">Ksh</span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="price"
                        name="itemPrice"
                        value={this.state.itemPrice}
                        onChange={this.updateValue}
                      />
                      <span class="input-group-addon">.00</span>
                    </div>
                    <br />
                    <label>quantity</label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="quantity"
                        name="quantity"
                        value={this.state.quantity}
                        onChange={this.updateValue}
                      />
                      <span class="input-group-addon">@</span>
                    </div>
                    <br />
                    <div className="input-group"></div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    data-dismiss="modal"
                    class="btn btn-primary"
                    onClick={() => this.updateRecord(id)}
                  >
                    update Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  updateValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  setTableToDelete = (id) => {
    axios.get(`${this.API}/api/getspecificitem?id=` + id).then((res) => {
      this.setState({
        deleteItem: res.data,
        deleteItemId: id,
      });
    });
  };

  setDataToUpdate = (id) => {
    axios.get(`${this.API}/api/getspecificitem?id=` + id).then((res) => {
      res.data.map((item) => {
        return this.setState({
          itemName: item.itemName,
          companyName: item.companyName,
          itemPrice: item.itemPrice,
          manufacteringDate: item.manufacteringDate,
          expiryDate: item.expiryDate,
          quantity: item.quantity,
        });
      });
    });
  };

  getTableToDelete = () => {
    return this.state.deleteItem.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.itemName}</td>
          <td>{item.companyName}</td>
          <td>{item.itemPrice}</td>
          <td>{item.manufacteringDate}</td>
          <td>{item.expiryDate}</td>
          <td>{item.quantity}</td>
        </tr>
      );
    });
  };

  deleteRecord = (id) => {
    axios.delete(`${this.API}/api/admin/deleteitem?id=` + id).then(
      this.setState({
        items: this.state.items.filter((item) => item._id !== id),
      })
    );
  };

  updateRecord = (id) => {
    const data = this.state;
    return axios.patch(`${this.API}/api/admin/updateitem?id=` + id, data).then(
      this.setState({
        updated: true,
      })
    );
  };

  carReady = (plateNumber) => {
    return axios
      .patch(`${this.API}/api/admin/carready?plateNumber=` + plateNumber)
      .then((res) => {
        console.log(res);
        console.log(plateNumber);
      });
  };

  render() {
    if (this.state.updated === true) {
      axios.get(`${this.API}/api/admin/getitems`).then((res) => {
        this.setState({
          items: res.data,
          updated: false,
        });
      });
    }
    return (
      <div className="table-section">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title main-font">Items in the Register</h3>
          </div>
          <div className="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Company Name</th>
                  <th>Item Price</th>
                  <th>Manufactering Date</th>
                  <th>Expiry Date</th>
                  <th>Quantity </th>
                  <th>Expires In</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.registerTable()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
