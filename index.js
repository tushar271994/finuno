'use strict';
const express = require('express');                                // Used to access express
const bodyParser = require('body-parser');                         // Ussed too access the body-parser

const restService = express();

restService.use(bodyParser.urlencoded({                           
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/finUNO', function(req, res) {                  
 var transactionType = req.body.result.parameters.transactionType;   
 var exchange = req.body.result.parameters.exchange;
 var quantity = req.body.result.parameters.quantity;
 var scripnames = req.body.result.parameters.scripnames;
 console.log("scripname result", scripnames);

   return res.json({
         speech: "Alright! I will " + transactionType + quantity + "shares of" + scripnames + "on" + exchange
    });
});
 
restService.listen((process.env.PORT || 8001), function() {
     console.log("Server up and listening");
     });
//server.timeout = 1000;