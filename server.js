const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// defining routes here
const inventoryRoute = require("./Routes/inventory");
const payfortRoute = require("./Routes/payfort");
const customerRoute = require("./Routes/customer");
const salesRoute = require("./Routes/sales");
const ecomcat = require("./Routes/ecommercecat");

//*! cors
const cors = require("cors");

// middlewares are all here
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for routes
app.use("/inventory", inventoryRoute);
app.use("/payfort", payfortRoute);
app.use("/customer", customerRoute);
app.use("/sales", salesRoute);
app.use("/ecomcat", ecomcat);

app.post("/debugging", (req , res) => {
  console.log(req.body);
});

// listening on port here
app.listen(5000, () => console.log("server is running"));
