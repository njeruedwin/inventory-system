const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

router.get("/", (req, res) => {
  Item.find({})
    .then((items) => {
      res.send(items);
    })
    .catch((error) => {
      return res.send({
        success: false,
        message: error,
      });
    });
});

module.exports = router;
