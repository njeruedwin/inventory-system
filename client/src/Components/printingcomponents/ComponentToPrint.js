import React from "react";
import axios from "axios";

import {environment} from '../../environment/environment.prod'

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };

    this.API = environment.API

    this.registerTable = this.registerTable.bind(this);
    this.calculateDaysLeft = this.calculateDaysLeft.bind(this);
  }

  componentDidMount = () => {
    console.log("Table component has mounted");
    axios.get(`${this.API}/api/admin/getItems`).then((res) => {
     
      this.setState({
        items: res.data,
      });
    });
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

  render() {
    return (
      <div className="table-section">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title main-font">Inventory Items Report</h3>
          </div>
          <div className="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Company Name</th>
                  <th>price</th>
                  <th>Manufactering Date</th>
                  <th>Expiry Date</th>
                  <th>Quantity</th>
                  <th>Expires In</th>
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

export default ComponentToPrint;
