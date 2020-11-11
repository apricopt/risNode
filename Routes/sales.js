const express = require("express");
const router = express.Router();
var Odoo = require("odoo-xmlrpc");

router.get("/", (req, res) => {
  res.send("yeah i sales route is working");
});

// exporting these routes
module.exports = router;
