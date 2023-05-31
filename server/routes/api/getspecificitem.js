const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

router.get("/", (req, res) => {
  const { query } = req;
  const { id } = query;

  Item.find({ _id: id })
    .then((items) => {
      if (items == 0) {
        return res.send({
          success: false,
          message: "Item does not exist",
        });
      }

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
