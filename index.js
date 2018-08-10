'use strict';
const express = require('express');                                // Used to access express
const bodyParser = require('body-parser');                         // Ussed too access the body-parser

const restService = express();

restService.use(bodyParser.urlencoded({                           
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/finUNO', function(req, res) {                  
    
 var scripnames = req.body.result.parameters.scripnames;
 console.log("scripname result", scripnames);

   return res.json({
                speech: "Hi your scrip name is" + " " + scripnames  
                });
  });
 
restService.listen((process.env.PORT || 8001), function() {
     console.log("Server up and listening");
     });
//server.timeout = 1000;