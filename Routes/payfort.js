const express = require("express");
const router = express.Router();
var hash = require("object-hash");

// introducing the payfort-node library to make requests to payfort
const payfort = require("payfort-node");
// create client
var client = payfort.create_client("development", {
  access_code: "Yib4oYb1xy0NAfRQ3zqo",
  merchant_identifier: "4b9b597e",
  passphrase: "39ljNXDVFkPlAohbTOlxaf]@",
});

// response route to accept tokenization data
router.post("/tokenresponse", (req, res) => {
  console.log(req);
});

router.get("/", (req, res) => {
  let data = {
    access_code: "Yib4oYb1xy0NAfRQ3zqo",
    customer_email: "apricopt@gmail.com",
    language: "en",
    merchant_identifier: "4b9b597e",
    merchant_reference: "XYZ9239-yu898",
    service_commad: "TOKENIZATION",
  };
  const cardinfo = {
    card_number: 4005550000000001,
    card_security_code: 123,
    expiry_date: "05/21",
  };

  const dastakhat = payfort.create_signature("39ljNXDVFkPlAohbTOlxaf]@", data);

  hash(data);
  console.log(dastakhat);
});

// exporting these routes
module.exports = router;
