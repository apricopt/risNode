const express = require("express");
const router = express.Router();
var Odoo = require("odoo-xmlrpc");

var odoo = new Odoo({
  url: "https://odoo-ps-psae-ris.odoo.com/xmlrpc/2/object",
  db: "odoo-ps-psae-ris-master-884890",
  username: "sbajwa@ris.co",
  password: "Ris@123456",
});

// to create a customer
router.post("/create", (req, res) => {
  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push({
      name: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      x_studio_password_1: req.body.password,
      x_studio_blocked: false,
    });
    var params = [];
    params.push(inParams);
    odoo.execute_kw("res.partner", "create", params, function (err, value) {
      if (err) {
        return console.log(err);
        res.send("Error while creating an account");
      }
      console.log("Result: ", value);
      res.send("your account has been sucessfully created!");
    });
  });
});

// to login customer
router.post("/login", (req, res) => {
  // search and read
  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([
      ["email", "=", req.body.identifier],
      ["x_studio_password_1", "=", req.body.password],
    ]);
    inParams.push(["name", "x_studio_blocked", "x_studio_favouritesmany"]); //fields
    inParams.push(0); //offset
    inParams.push(5); //limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw("res.partner", "search_read", params, function (
      err,
      value
    ) {
      if (err) {
        res.send(
          "one of the info is not correct! Please try with correct credentials"
        );
        return console.log(err);
      }
      console.log("Result: ", value);
      if (value.length == 0) {
        res.send("failed");
      } else {
        res.json(value);
      }
    });
  });
});

// to add into favorites
router.get("/fav/add", (req, res) => {
  // update records
  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([5507]); //id to update
    inParams.push({
      x_studio_favouritesmany: [5261], // it will accept idies of products and will update the favourite products no matter it is delete or add. it will just create the mirror you know.
    });
    var params = [];
    params.push(inParams);
    odoo.execute_kw("res.partner", "write", params, function (err, value) {
      if (err) {
        return console.log(err);
      }
      console.log("Result: ", value);
    });
  });
});

// exporting these routes
module.exports = router;
