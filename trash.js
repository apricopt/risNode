var moyasar = new (require("moyasar"))(
    "sk_test_65JkpKq1tkkSaaQQrYcRzhUqKJmYakk8xXrSgVdC"
  );



  // app.get("/", (req, res) => {
//   res.send(`<h1>RIS NODEJS SERVER IS RUNNING</h1>`);
// });

// app.get("/paymentmade", (req, res) => {
//   console.log(req.query);
//   res.redirect("https://ris.co/checkout");
// });

// // checking if the user ready made the payment from mooyosar
// app.post("/checkstatus", (req, res) => {
//   console.log(req.body.id);
//   const paymentid = req.body.id;

//   moyasar.payment
//     .fetch(paymentid)
//     .then(function (payment) {
//       if (payment.status == "paid") {
//         res.json(payment);
//       } else if (payment.status == "failed") {
//         res.json(payment);
//       }
//     })
//     .catch((err) => console.log(err));
// });

// app.post("/inventorychange", (req, res) => {
//   console.log(req.body);
//   res.send("agya bawa g");
// });

// // odoo stuff will be handles below
// const db = "apricopt";
// const password = "babydaby10";
// let uid;
// // to get authentication uuid
// var client = xmlrpc.createClient({
//   url: "https://apricopt.odoo.com/xmlrpc/2/common",
// });
// // to send the methods calls i think
// var models = xmlrpc.createClient({
//   url: "https://apricopt.odoo.com/xmlrpc/2/object",
// });

// to check the version of the odoo
// client.methodCall('authenticate', ['apricopt', 'apricopt@gmail.com', 'babydaby10', []], (res, value) => {
//     console.log(value);
//     uid = value;
//     models.methodCall('execute_kw', [db, uid, password,
//         'res.partner', 'check_access_rights',
//         ['read'], { 'raise_exception': false }], (res, value) => {
//             console.log(value)

//         })

// })

// now calling the actual methods
// client.methodCall('authenticate', ['apricopt', 'apricopt@gmail.com', 'babydaby10', []], (res, value) => {
//     console.log(value);
//     uid = value;
//     let ids;
//     models.methodCall('execute_kw', [db, uid, password,
//         'product.product', 'search', [[['display_name', '=', 'a']]]], (res, value) => {
//             console.log(value)
//             ids = value;
//             models.methodCall('execute_kw', [db, uid, password,
//                 'product.product', 'read', [ids], { 'fields': ['display_name', 'free_qty', 'create_date'] }], (res, value) => {
//                     console.log(value);

//                 })

//         })
