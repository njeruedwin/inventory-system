const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

router.delete("/", (req, res) => {
  Item.deleteOne({ _id: req.query.id }, (err, doc) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }
    res.send(doc);
  });
});

module.exports = router;
