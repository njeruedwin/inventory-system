const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

router.get("/", (req, res) => {
  const { query } = req;
  const { id } = query;

  Item.find({ _id: id }, (err, items) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    if (items == 0) {
      return res.send({
        success: false,
        message: "Item does not exist",
      });
    }

    res.send(items);
  });
});

module.exports = router;
