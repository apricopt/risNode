
const express = require('express');
const app = express();

// cors 
const cors = require('cors');


// middlewares are all here
app.use(cors());
app.use(express.json());










// odoo starts from here
var Odoo = require('odoo-xmlrpc');


var odoo = new Odoo({
    url: 'https://apricopt.odoo.com/xmlrpc/2/object',
    db: 'apricopt',
    username: 'apricopt@gmail.com',
    password: 'babydaby10'
});


// just for connection
// odoo.connect(function (err) {
//     if (err) { return console.log(err); }
//     console.log('Connected to Odoo server.');
// });


// search  records done
// odoo.connect(function (err) {
//     if (err) { return console.log(err); }
//     console.log('Connected to Odoo server.');
//     var inParams = [];
//     inParams.push([['display_name', '=', 'a']]);
//     var params = [];
//     params.push(inParams);
//     odoo.execute_kw('product.product', 'search', params, function (err, value) {
//         if (err) { return console.log(err); }
//         console.log('Result: ', value);
//     });
// });




app.get('/products', (req, res) => {


    // read record  (filtered by category)
    odoo.connect(function (err) {
        if (err) { return console.log(err); }
        console.log('Connected to Odoo server.');
        var inParams = [];
        inParams.push([['display_name', '=', 'a']]);
        inParams.push(0);  //offset
        inParams.push(5);  //Limit
        var params = [];
        params.push(inParams);
        odoo.execute_kw('product.product', 'search', params, function (err, value) {
            if (err) { return console.log(err); }
            var inParams = [];
            inParams.push(value); //ids
            // inParams.push(['display_name', 'free_qty', 'create_date']); //fields
            var params = [];
            params.push(inParams);
            odoo.execute_kw('product.product', 'read', params, function (err2, value2) {
                if (err2) { return console.log(err2); }
                console.log('Result: ', value2[0]);
                res.json(value2)
            });
        });
    });





})












app.get('/createsale', (req, res) => {



    odoo.connect(function (err) {
        if (err) { return console.log(err); }
        console.log('Connected to Odoo server.');
        var inParams = [];
        inParams.push({ 'name': 'nawa customer da order' })
        var params = [];
        params.push(inParams);
        odoo.execute_kw('res.partner', 'create', params, function (err, value) {
            if (err) { return console.log(err); }
            console.log('Result: ', value);
            res.json(value)
        });
    });




})









// listening on port here
app.listen(5000, () => console.log("server is running"));