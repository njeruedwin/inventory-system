const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//import routes
const signInRoute = require("./routes/api/signin");
const createAdminRoute = require("./routes/api/createadmin");
const verifyRoute = require("./routes/api/verify");
const logOutRoute = require("./routes/api/logout");
const addItemRoute = require("./routes/api/addItem");
const getSpecificItemRoute = require("./routes/api/getspecificitem");
const updateItemRoute = require("./routes/api/updateitem");
const deleteItemRoute = require("./routes/api/deleteitem");
const getItemsRoute = require("./routes/api/getitems");
const { verify } = require("jsonwebtoken");

//set routes
app.use("/api/admin/signin", signInRoute);
app.use("/api/admin/createadmin", createAdminRoute);
app.use("/api/admin/logout", logOutRoute);
app.use("/api/admin/verify", verifyRoute);
app.use("/api/admin/additem", addItemRoute);
app.use("/api/getspecificitem", getSpecificItemRoute);
app.use("/api/admin/updateitem", updateItemRoute);
app.use("/api/admin/deleteitem", deleteItemRoute);
app.use("/api/admin/getitems", getItemsRoute);

//connect to the database
mongoose.connect(
  "mongodb://localhost/inventorysystem",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Successfuly conneted to mongoDB");
  }
);

//listen to port
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
