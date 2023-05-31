const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

router.delete("/", (req, res) => {
  Item.deleteOne({ _id: req.query.id })
    .then((doc) => {
      res.send(doc);
    })
    .catch((error) => {
      return res.send({
        success: false,
        message: error,
      });
    });
});

module.exports = router;
