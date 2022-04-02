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
    },
    (err, item) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }

      res.send({
        success: true,
        message: "Item successfuly updated",
      });
    }
  );
});

module.exports = router;
