const express = require("express");
const app = express();

// defining routes here
const inventoryRoute = require("./Routes/inventory");
const payfortRoute = require("./Routes/payfort");
const customerRoute = require("./Routes/customer")

//*! cors
const cors = require("cors");

// middlewares are all here
app.use(cors());
app.use(express.json());

// middleware for routes
app.use("/inventory", inventoryRoute);
app.use("/payfort", payfortRoute);
app.use("/customer" , customerRoute)

// listening on port here
app.listen(5000, () => console.log("server is running"));
