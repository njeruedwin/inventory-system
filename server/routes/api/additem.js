const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

router.post("/", (req, res) => {
  const { body } = req;
  const {
    itemName,
    companyName,
    itemPrice,
    manufacteringDate,
    expiryDate,
    quantity,
  } = body;

  if (!itemName) {
    return res.send({
      success: false,
      message: "Name field empty",
    });
  }
  if (!companyName) {
    return res.send({
      success: false,
      message: "company name field empty",
    });
  }
  if (!itemPrice) {
    return res.send({
      success: false,
      message: "item price field empty",
    });
  }
  if (!manufacteringDate) {
    return res.send({
      success: false,
      message: "Manufactering Date field empty",
    });
  }
  if (!expiryDate) {
    return res.send({
      success: false,
      message: "Expiry Date field empty",
    });
  }

  //add the item to the DB
  const newItem = new Item({
    itemName,
    companyName,
    itemPrice,
    manufacteringDate,
    expiryDate,
    quantity,
  });

  newItem
    .save()
    .then((item) => {
      res.send({
        success: true,
        message: "New item saved",
      });
    })
    .catch((error) => {
      return res.send({
        success: false,
        message: error,
      });
    });
});

module.exports = router;
