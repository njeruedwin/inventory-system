const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

router.patch("/", (req, res) => {
  const { query, body } = req;
  const {
    itemName,
    companyName,
    itemPrice,
    manufacteringDate,
    expiryDate,
    quantity,
  } = body;
  const { id } = query;

  Item.updateOne(
    { _id: id },
    {
      $set: {
        itemName,
        companyName,
        itemPrice,
        manufacteringDate,
        expiryDate,
        quantity,
      },
    }
  )
    .then((item) => {
      res.send({
        success: true,
        message: "Item successfuly updated",
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
