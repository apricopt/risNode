const express = require("express");
const router = express.Router();
var sha256 = require("js-sha256");
const axios = require("axios");
const fetch = require("node-fetch");

// TOKENIZATION PROCESS STARTS

// response route to accept tokenization data
router.post("/tokenresponse", (req, res) => {
  // jb tokenizaation k bad response ayega
  if (req.body.status == 18) {
    console.log(req.body);
    let access_code = req.body.access_code;
    let merchant_reference = req.body.merchant_reference;
    let token_name = req.body.token_name;
    let object = {
      access_code: access_code,
      amount: 1700,
      command: "PURCHASE",
      currency: "SAR",
      customer_email: "mohsin@gmail.com",
      language: "en",
      merchant_identifier: "4b9b597e",
      merchant_reference: merchant_reference,
      token_name: token_name,
    };

    // // signature calculation starts
    const passphrase = "39ljNXDVFkPlAohbTOlxaf]@";

    let stringToCode = `${passphrase}access_code=${object.access_code}amount=${object.amount}command=${object.command}currency=${object.currency}customer_email=${object.customer_email}language=${object.language}merchant_identifier=${object.merchant_identifier}merchant_reference=${object.merchant_reference}token_name=${object.token_name}${passphrase}`;
    const hashedString = sha256(stringToCode);
    // signature calculation ends

    object.signature = hashedString;

    // axios
    //   .post("https://sbpaymentservices.payfort.com/FortAPI/paymentApi", object)
    //   .then((response) => res.send(response))
    //   .catch((err) => console.log(err));
    console.log(JSON.stringify(object));
    // console.log("yeh rahi hased ");
    // axios({
    //   method: "POST",
    //   url: "https://sbpaymentservices.payfort.com/FortAPI/paymentApi",
    //   data: JSON.stringify(object),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => res.send(response))
    //   .catch((err) => console.log(err));

    async function postData() {
      try {
        const data = await fetch(
          "https://sbpaymentservices.payfort.com/FortAPI/paymentApi",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
          }
        );
        const json = await data.json();

        if (json) {
          res.redirect(json["3ds_url"]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    postData();
  } else if (req.body.status == 14) {
    // jb 3D k baad response ayega
    console.log("3d hogya", req.body);
    res.redirect(`https://new.ris.co?status=${req.body.response_message}`);
  } else if (req.body.status == 13) {
    console.log("card is declined", req.body);
    res.redirect(`https://new.ris.co?status=${req.body.response_message}`);
  } else {
    console.log("miss match hogya", req.body);
    res.redirect(`https://new.ris.co?status=${req.body.response_message}`);
  }
});

// okay calculating signature route for tokenization
router.post("/tokenization/signature", (req, res) => {
  const passphrase = "39ljNXDVFkPlAohbTOlxaf]@";
  let object = req.body;
  console.log(object);
  let stringToCode = `${passphrase}access_code=${object.access_code}language=${object.language}merchant_identifier=${object.merchant_identifier}merchant_reference=${object.merchant_reference}service_command=${object.service_command}${passphrase}`;

  const hashedString = sha256(stringToCode);
  console.log(stringToCode);
  res.send(hashedString);
});

// TOKENIZATION PROCESS ENDS

// OPERATION PROCESS STARTS

// route to calculate signature of operation
router.post("/operation/signature", (req, res) => {
  const passphrase = "39ljNXDVFkPlAohbTOlxaf]@";
  let object = req.body;

  let stringToCode = `${passphrase}access_code=${object.access_code}amount=${object.amount}command=${object.command}currency=${object.currency}customer_email=${object.customer_email}language=${object.language}merchant_identifier=${object.merchant_identifier}merchant_reference=${object.merchant_reference}token_name=${object.token_name}${passphrase}`;
  const hashedString = sha256(stringToCode);
  console.log(stringToCode);
  res.send(hashedString);
});

// route to peform operation after tokenization
router.post("/operation", (req, res) => {
  console.log(req.body);
});

// exporting these routes
module.exports = router;
