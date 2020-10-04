const express = require("express");
const router = express.Router();
var Odoo = require("odoo-xmlrpc");

// var odoo = new Odoo({
//   url: "https://xadxeb.odoo.com/xmlrpc/2/object",
//   db: "xadxeb",
//   username: "xadxeb@gmail.com",
//   password: "babydaby10",
// });

var odoo = new Odoo({
  url: "https://odoo-ps-psae-ris.odoo.com/xmlrpc/2/object",
  db: "odoo-ps-psae-ris-master-884890",
  username: "sbajwa@ris.co",
  password: "Ris@123456",
});

//  testing route
router.get("/testing", (req, res) => {
  //* just for connection
  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    res.send("Connected to Odoo server.");
  });
});

//!  to get the categories
router.get("/categories", (req, res) => {
  // read record  (filtered by category)
  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([]); // domain filter (Possibly empty as inParams.push([]))
    inParams.push(0); //offset
    // inParams.push(5); //Limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw("product.category", "search", params, function (
      err,
      value
    ) {
      if (err) {
        return console.log(err);
      }
      var inParams = [];
      inParams.push(value); //ids
      inParams.push(["id", "name", "parent_id", "child_id", "product_count"]); //fields
      var params = [];
      params.push(inParams);
      odoo.execute_kw("product.category", "read", params, function (
        err2,
        value2
      ) {
        if (err2) {
          return console.log(err2);
        }

        let categories = [];
        let subcategories = [];
        let microcategories = [];

        // alag alag array mai dal raha
        for (let i = 0; i < value2.length; i++) {
          if (!value2[i].parent_id) {
            // console.log(catfinder(value2[i].child_id));

            categories.push(value2[i]);
          } else if (value2[i].parent_id[1].indexOf("/") == -1) {
            subcategories.push(value2[i]);
          } else if (value2[i].parent_id[1].indexOf("/") !== -1) {
            microcategories.push(value2[i]);
          }
        }
        // daal diya alag alag array mai

        // a function that will see if the subcategories has children then copy them and bring them to grandfather
        function dada() {
          j;
        }

        // ! now filtering data according to our need

        let finalcats = categories.map((maincat) => ({
          id: maincat.id,
          name: maincat.name,
          // children mtlb jo subcategories hen aur agr subcategoires ki b agay categories hen sab ki id's akathi karo
          children: [
            ...maincat.child_id,
            ...microcategories
              .filter((item) => maincat.child_id.includes(item.parent_id[0]))
              .map((item) => item.id),
          ],
          subcategories: subcategories
            .map((subcat) => ({
              id: subcat.id,
              name: subcat.name,
              children: subcat.child_id,
              microcategories: microcategories.filter((microcat) =>
                subcat.child_id.includes(microcat.id)
              ),
            }))
            .filter((subcat) => maincat.child_id.includes(subcat.id)),
        }));
        // this console.log to display the categories
        // console.log(finalcats);
        res.json(finalcats);
      });
    });
  });
});

// to search and read products
router.post("/products/:main/:sub/:micro", (req, res) => {
  console.log(req.body);
  // read record  (filtered by category)
  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([["categ_id", "=", req.body.categ_id]]); // domain filter (Possibly empty as inParams.push([]))
    inParams.push(0); //offset
    // inParams.push(5); //Limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw("product.product", "search", params, function (err, value) {
      if (err) {
        return console.log(err);
      }
      var inParams = [];
      inParams.push(value); //ids
      inParams.push([
        "id",
        "display_name",
        "free_qty",
        "categ_id",
        "list_price",
        "image_1920",
      ]); //fields
      var params = [];
      params.push(inParams);
      odoo.execute_kw("product.product", "read", params, function (
        err2,
        value2
      ) {
        if (err2) {
          return console.log(err2);
        }
        // this console to show the products get displayed in categories
        // console.log(value2);
        res.send(value2);
      });
    });
  });
});

// to get info about specific product
router.get("/product/:id", (req, res) => {
  console.log(req.params.id);

  // read record  (filtered by category)
  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([["id", "=", `${parseInt(req.params.id)}`]]); // domain filter (Possibly empty as inParams.push([]))
    inParams.push(0); //offset
    // inParams.push(5); //Limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw("product.product", "search", params, function (err, value) {
      if (err) {
        return console.log(err);
      }
      var inParams = [];
      inParams.push(value); //ids
      inParams.push([
        "display_name",
        "free_qty",
        "categ_id",
        "list_price",
        "image_1920",
        "x_studio_dimension",
        "x_studio_brand",
        "default_code",
        "description_sale",
        "x_studio_image2",
        "x_studio_image3",
        "x_studio_image4",
        "x_studio_image5",
      ]); //fields
      var params = [];
      params.push(inParams);
      odoo.execute_kw("product.product", "read", params, function (
        err2,
        value2
      ) {
        if (err2) {
          return console.log(err2);
        }
        // this console.log to show single product detail in product gallery
        // console.log(value2);
        res.send(value2);
      });
    });
  });
});

// to search you may like products
router.get("/maylike/:id", (req, res) => {
  console.log(req.params);
  // read record  (filtered by category)
  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([["categ_id", "=", parseInt(req.params.id)]]); // domain filter (Possibly empty as inParams.push([]))
    inParams.push(0); //offset
    // inParams.push(5); //Limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw("product.product", "search", params, function (err, value) {
      if (err) {
        return console.log(err);
      }
      var inParams = [];
      inParams.push(value); //ids
      inParams.push([
        "id",
        "display_name",
        "free_qty",
        "categ_id",
        "list_price",
        "image_1920",
      ]); //fields
      var params = [];
      params.push(inParams);
      odoo.execute_kw("product.product", "read", params, function (
        err2,
        value2
      ) {
        if (err2) {
          return console.log(err2);
        }
        // this console to show the products get displayed in categories
        console.log(value2);
        res.send(value2);
      });
    });
  });
});
// exporting these routes
module.exports = router;
