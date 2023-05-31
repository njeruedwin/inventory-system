const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();
const {MONGO_URI} = require('./config') //get access to the mongoDB

const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//import routes
const signInRoute = require("./server/routes/api/signin");
const createAdminRoute = require("./server/routes/api/createadmin");
const verifyRoute = require("./server/routes/api/verify");
const logOutRoute = require("./server/routes/api/logout");
const addItemRoute = require("./server/routes/api/additem");
const getSpecificItemRoute = require("./server/routes/api/getspecificitem");
const updateItemRoute = require("./server/routes/api/updateitem");
const deleteItemRoute = require("./server/routes/api/deleteitem");
const getItemsRoute = require("./server/routes/api/getitems");
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

mongoose.connect(
  MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true }
).then(console.log('successfully connected to MongoDB'))

const port =  5000;


  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });


app.listen(port, () => console.log(`Listening on port ${port}`));
