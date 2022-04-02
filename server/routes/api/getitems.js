const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

router.get("/", (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    res.send(items);
  });
});

module.exports = router;
