'use strict';
const express = require('express');                                // Used to access express
const bodyParser = require('body-parser');                         // Ussed too access the body-parser

const restService = express();

restService.use(bodyParser.urlencoded({                           
    extended: true
}));

restService.use(bodyParser.json());

/* Loading a scrip data */

restService.post('/finUNO', function(req, res) {                    // Uses post() to get data from dialog flow in json format
    //var scrips = require("./all_scrips.json");                      // Gets data from the scrip list
    // var scrips = require("./Equity_final.json");
    var inputText= req.body.result.resolvedQuery;
    var action = req.body.result.action;                            // Reads action field from json  
    
    switch(action) {
            
        case "tradeAction" :                                        //Trade intent 
            
           /* Extracting intents parameters */

            var transactionType = req.body.result.parameters.transactionType;
            var exchange = req.body.result.parameters.exchange;
            var priceType = req.body.result.parameters.priceType;
            var productType = req.body.result.parameters.productType;
            var quantity = req.body.result.parameters.quantity;
            var shares = req.body.result.parameters.shares;
            var validity = req.body.result.parameters.validity;
            var scripnames = req.body.result.parameters.scripnames;


            console.log("scripname", scripnames);

           /* Removing all keywords except scrip */

            inputText = inputText.toUpperCase();
            inputText = inputText.replace(transactionType.toUpperCase() , "");
            inputText = inputText.replace(exchange , "");
            inputText = inputText.replace(priceType.toUpperCase() , "");
            inputText = inputText.replace(productType.toUpperCase() , "");   
            inputText = inputText.replace(quantity , "");
            inputText = inputText.replace(shares.toUpperCase() , "");
            inputText = inputText.replace(validity.toUpperCase() , "");
            inputText = inputText.replace("TRADE" , "");
            inputText = inputText.trim();

             /* Stockwords curently being removed from inputtext 
              Add addition stockwords to this list */
              console.log("inputtext is", inputText);

            // var stockwords=["ON", "AT","OF","WITH"];
            // var synonymwords=["NORM","COVER","CASH AND CARRY","MARGIN INTRADAY SQUAREOFF"];
            // var removalString = stockwords.concat(synonymwords);
             
            // function scripword(data) {
               
            //    for(var x=0 ; x<removalString.length;x++){
            //        var searchString = ' '+removalString[x];
            //     if(data.search(searchString) !== -1 && data !==""){
            //         data= data.replace(searchString, "");
            //         console.log("process" , process);
            //         inputText=data;
            //         inputText=inputText.trim();
            //     }
            //    }  
            // } 
            //   scripword(inputText);

            var exchange_possibilities = "The stock is not available on ";
            exchange_possibilities = exchange_possibilities.concat(exchange);
            exchange_possibilities = exchange_possibilities.concat(". Please type in exchange from the following: ");
            exchange=exchange.toUpperCase();

          /* Arrays for potential scrip  matches */
            // var scriplist1 = [];
            // var scriplist2 = [];
            // var scriplist3 = [];
            
            /* Flag indicating whether scrip is Substring of field1 */
            // var field1Substring=0;

            
    //         for(var i=0 ; i < scrips.length ; i++){    
    //              // Find matching scrip(s)  
                
    //             /* Checking for match with symbol in field2 : example INFY */

    //             // console.log("product type" , productType);
               
    //              if(inputText === scrips[i].FIELD2){
    //                 var obj={
    //                    FIELD1:scrips[i].FIELD1,
    //                    FIELD4:scrips[i].FIELD4,
    //                    FIELD3:scrips[i].FIELD3,
    //                 }
    //                 scriplist1.push(obj);
    //             } 
              
    //             /* Checking for match with extended symbol or code in field3 : example INFY-EQ or 500209 */

    //             else if(inputText === scrips[i].FIELD3){
    //                 var obj={
    //                     FIELD1:scrips[i].FIELD1,
    //                     FIELD3:scrips[i].FIELD3,
    //                     FIELD4:scrips[i].FIELD4,
    //                 }
    //                  scriplist1.push(obj);
    //             }
    //         }

    //     /* If input doesn't match symbol or extended symbol check if substring of scripname in field1 */
    //    if(scriplist1.length===0 && inputText!== ""){
    //       for(var i=0 ; i < scrips.length ; i++){                    // Find matching scrip(s)  
            
    //         /* Checking for match with symbol : example INFY */
         
    //        if(scrips[i].FIELD1.toUpperCase().search(inputText)!==-1){

    //        /* Checking if input is substring of scripname */
           
    //        var obj={
    //             FIELD3:scrips[i].FIELD3,
    //             FIELD1:scrips[i].FIELD1,
    //             FIELD4:scrips[i].FIELD4,
    //         }

    //            scriplist1.push(obj);
    //            field1Substring=1;
    //         }
    //       }
    //       /* If inputtext is multiple words and previous conditions doesn't match split into words and search for each word */ 
         
    //       if(field1Substring===0 && inputText !== ""){
    //         for(var i=0 ; i < scrips.length ; i++){   

    //             var scripwords = inputText.split(" ");
    //             for(var j=0 ; j<scripwords.length; j++){
    //                if(scrips[i].FIELD1.toUpperCase().search(scripwords[j])!==-1){
    //                 /* Checking if input is substring of scripname */
                    
    //                   var obj={
    //                      FIELD3:scrips[i].FIELD3,
    //                      FIELD1:scrips[i].FIELD1,
    //                      FIELD4:scrips[i].FIELD4,
                         
    //                    }
    //                    scriplist1.push(obj);
    //                 }
    //             }
    //         }
    //      }
    //     }

    //         /* Found only 1 match checking for exchange */
    //         var exchange_scrip_match = 0;
    //            if(scriplist1.length === 1){
    //             if(scriplist1[0].FIELD4===exchange){
    //                 scriplist3.push(scriplist1[0].FIELD1);
    //                 scriplist2.push(scriplist1[0].FIELD3);
    //                 exchange_scrip_match = 1;
    //             }
    //             else{
    //                 console.log("exchange possiblity");
    //                 exchange_possibilities=exchange_possibilities.concat(scriplist1[0].FIELD4);
    //                 scriplist3.push(scriplist1[0].FIELD1);
    //                 scriplist2.push(scriplist1[0].FIELD3);
    //                 exchange_scrip_match = 0;
    //                }
    //          }

    //          /* Filter match for the right exchange */
    //          else if((scriplist1.length === 2)){
    //            for(i=0 ; i < scriplist1.length ; i++){
    //               if(scriplist1[i].FIELD4===exchange ){
    //                scriplist3.push(scriplist1[i].FIELD1);
    //                scriplist2.push(scriplist1[i].FIELD3);
    //                exchange_scrip_match = 1;
    //               }
    //             }
    //         }
    //         /* Build up possible matches to allow user to select*/
    //           else if((scriplist1.length > 2)){
    //             if(scriplist1.length > 20){
    //               var scripstring= "Too many matches. Please provide more specific inputs:";
    //             }
    //             else{
    //               var scripstring = "From the following scrips type in symbol/code of the scrip you are interested in:";
    //             }
    //               for(i=0 ; i < scriplist1.length ; i++){
    //                 if(exchange===scriplist1[i].FIELD4 || exchange === ""){
    //                   scripstring = scripstring.concat("\n");
    //                   scripstring = scripstring.concat(scriplist1[i].FIELD1 + "(" + exchange + ")");
    //                   scripstring = scripstring.concat("(" + scriplist1[i].FIELD3 + ")" );
    //                   scripstring = scripstring.concat(",");
    //                   exchange_scrip_match = 1;
    //                 }
    //              }
    //             var lastIndex = scripstring.lastIndexOf(",");
    //             scripstring = scripstring.substring(0, lastIndex);
    //         }
                     
    //          if(scriplist3.length === 1 && exchange !== ""){
    //               if(exchange_scrip_match === 1){
                      scripnames = inputText;  
                      console.log("scripname is", scripnames);    
    //                }
    //                else{        
    //                 return res.json({
    //                  contextOut : [{
    //                  name : "tradecontextout",
    //                  parameters : {
    //                     scripnames : scripnames
    //                  }
    //                   }],
    //                 speech : exchange_possibilities,
    //                  displayText : exchange_possibilities
    //               });
    //             }}
    //         else  if(scripstring !== "" && exchange_scrip_match === 1 ){
    //             return res.json({
    //                 contextOut : [{
    //                     name : "tradecontextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     }
    //                 }],
    //                 speech :  scripstring ,
    //                 displayText :  scripstring 
    //             });
    //         }
    //         // else if(scriplist3.length === 0 && inputText !== "" && exchange !== ""){
    //         //         var noMatch="No match for scrip" + ":" + inputText;
    //         //       return res.json({
    //         //           contextOut : [{
    //         //           name : "tradecontextout",
    //         //           parameters : {
    //         //              scripnames : noMatch
    //         //           }
    //         //           }],
    //         //         speech : noMatch,
    //         //          displayText : noMatch
    //         //       });
    //         //   }
  

    //           if(  exchange === "" || transactionType === "" || quantity === "") {    //checks if all required fields have been filled yet
    //           if(scriplist1.length === 1)
    //             scripnames=scriplist1[0].FIELD3;
    //            if(scriplist1.length === 2)
    //              scripnames=scriplist1[0].FIELD3;
    //           return res.json({
    //                 contextOut : [{
    //                     name : "tradecontextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     }
    //                 }]
    //             });     
    //         }       
           
            if( scripnames !== "" && exchange !== "" && transactionType !== "" && quantity !== ""){
                
                return res.json({                                                     // returns final output by calling followupEvent 
                    contextOut : [{
                        name : "trade_dialog_context",
                        lifespan : 0
                        },
                        {
                        name : "a044aca4-554d-4acb-a8cf-ce1ac6c1f625_id_dialog_context",
                        lifespan : 0  
                        },
                        {
                        name : "trade_dialog_params_scripnames",
                        lifespan : 0    
                        },
                        {
                        name : "tradecontextout",
                        lifespan : 0    
                        },
                        {
                        name : "trade_dialog_params_exchange",
                        lifespan : 0
                    }],
                
                    followupEvent : {
                        data : {
                            transactionType : transactionType,
                            exchange : exchange,
                            quantity : quantity,
                            scripnames : scripnames,
                            priceType : priceType,
                            productType : productType,
                            validity : validity,
                            shares : shares
                        },
                        name : "trade_slot_fill"
                    }
                });
            }
            break;
            
    //     case "resetAction" : // Reset intent
    //         var contextOut = req.body.result.contexts;
    //         for(var i=0;i<contextOut.length;i++)
    //             contextOut[i].lifespan=0;
    //         console.log(contextOut);
    //         return res.json({                                                     // returns final output by calling followupEvent 
    //               contextOut : contextOut,
    //             /*    contextOut : [{
    //                     name : "trade_dialog_context",
    //                     lifespan : 0
    //                     },
    //                     {
    //                     name : "a044aca4-554d-4acb-a8cf-ce1ac6c1f625_id_dialog_context",
    //                     lifespan : 0  
    //                     },
    //                     {
    //                     name : "trade_dialog_params_scripnames",
    //                     lifespan : 0    
    //                     },
    //                     {
    //                     name : "tradecontextout",
    //                     lifespan : 0    
    //                     },
    //                     {
    //                     name : "trade_dialog_params_exchange",
    //                     lifespan : 0
    //                 }],
    //             */
    //                 followupEvent : {
    //                     name : "resetEvent"
    //                 }
    //             });
    //         break;
            
            
    //     case "holdings_scrip_specific" : // holdings scrip specific intent--------------------------------------------
            
    //         var scripnames = req.body.result.parameters.scripnames;
    //         var shares = req.body.result.parameters.shares;
    //         inputText = inputText.toUpperCase();
    //         inputText = inputText.replace(shares.toUpperCase() , "");
    //         inputText = inputText.replace("HOLDINGS" , "");
    //         inputText = inputText.replace("HOLDING" , "");
               
    //         for(var i=0 ; i < scrips.length ; i++){                          //checking if scrip name is valid              
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1){
    //                 var j = (inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase());
    //                 if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD1).length] === " " || inputText.endsWith(scrips[i].FIELD1))){
    //                 scripnames = scrips[i].FIELD1;
    //                 return res.json({
    //                    contextOut : [{
    //                        name : "holdings_-_scrip_specific_dialog_params_scripnames",
    //                        lifespan : 0
    //                    },
    //                    {
    //                        name : "holdings_-_scrip_specific_dialog_context",
    //                        lifespan : 0
    //                    },
    //                    {
    //                        name : "9287948f-f373-4b45-b72e-0e0d4b1332dd_id_dialog_context",
    //                        lifespan : 0
    //                    }],
    //                    followupEvent : {
    //                        data : {
    //                            scripnames : scripnames,
    //                            shares : shares
    //                        },
    //                        name : "holdings_scrip_specific_event_followup"
    //                    }
    //                });    
    //                 }
    //             }
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1){   //checking iif scrip name is valid
    //                 var j = (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase());
    //                 if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD2).length] === " " || inputText.endsWith(scrips[i].FIELD2))){
    //                 scripnames = scrips[i].FIELD1;
    //                 return res.json({                           // returning final output with followupEvent 
    //                    contextOut : [{
    //                        name : "holdings_-_scrip_specific_dialog_params_scripnames",
    //                        lifespan : 0
    //                    },
    //                    {
    //                        name : "holdings_-_scrip_specific_dialog_context",
    //                        lifespan : 0
    //                    },
    //                    {
    //                        name : "9287948f-f373-4b45-b72e-0e0d4b1332dd_id_dialog_context",
    //                        lifespan : 0
    //                    }],
    //                    followupEvent : {
    //                        data : {
    //                            scripnames : scripnames,
    //                            shares : shares
    //                        },
    //                        name : "holdings_scrip_specific_event_followup"
    //                    }
    //                });
    //                 }
    //             }
    //         }  
    //         break;
            
    //     case "market_alert" : //case statement------------------------------------------------------
            
    //         var alert_if = req.body.result.parameters.alert_if;
    //         var less_than_greater_than = req.body.result.parameters.less_than_greater_than;
    //         var exchange = req.body.result.parameters.exchange;
    //         var value = req.body.result.parameters.value;
    //         var scripnames = req.body.result.parameters.scripnames;
    //         var exchange_possibilities = "The stock you have chosen is not available on ";
    //         exchange_possibilities = exchange_possibilities.concat(exchange);
    //         exchange_possibilities = exchange_possibilities.concat(". Please choose from the following :");
    //         inputText = inputText.toUpperCase();
    //         inputText = inputText.replace(alert_if.toUpperCase() , "");                 //replacing some keywords from the search string
    //         inputText = inputText.replace(less_than_greater_than.toUpperCase() , "");   //to minimise the search 
    //         inputText = inputText.replace(exchange.toUpperCase() , "");
    //         inputText = inputText.replace(value.toUpperCase() , "");
    //         inputText = inputText.replace("ALERT ME" , "");
    //         inputText = inputText.replace("ALERT" , "");
        
    //         for(var i=0 ; i < scrips.length ; i++){                             // checking if scrip name is valid
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1){
    //                 var j = (inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase());
    //                 if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD1).length] === " " || inputText.endsWith(scrips[i].FIELD1)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1){
    //                     var j = (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase());
    //                     if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD2).length] === " " || inputText.endsWith(scrips[i].FIELD2)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //         }  
    //         if(exchange === "" || alert_if === "" || less_than_greater_than === "" || value === "")
    //             return res.json({
    //                 contextOut : [{
    //                     name : "market_alert_contextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     },
    //                     lifespan : 1
    //                 }]
    //             }); 
    //         var exchange_scrip_match = 0;                                            //checking if scrip name and exchange name match
    //         if(exchange !== "" && scripnames !== ""){
    //             for(var i=0 ; i < scrips.length ; i++){
    //                 if(scripnames === scrips[i].FIELD1){
    //                     exchange_possibilities = exchange_possibilities.concat(" ");
    //                     exchange_possibilities = exchange_possibilities.concat(scrips[i].FIELD3);
    //                     if((exchange.toUpperCase()) === scrips[i].FIELD3){
    //                         exchange_scrip_match = 1;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //          if(exchange_scrip_match === 0 && scripnames !== "")         //printing message if scrip name and exchange don't match
    //             return res.json({
    //                 contextOut : [{
    //                     name : "market_alert_contextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     },
    //                     lifespan : 1
    //                 }],
    //                 speech : exchange_possibilities,
    //                 displayText : exchange_possibilities
    //             });
    //         if(scripnames !== "" && exchange !== "" && alert_if !== "" && value !== "" && less_than_greater_than !== ""){
                
    //             return res.json({                                        //printing final output message using followupEvent
    //                 contextOut : [{
    //                     name : "market_alert_dialog_context",
    //                     lifespan : 0
    //                     },
    //                     {
    //                     name : "f82d7c2b-f7ed-41c1-90c2-2b9d5cb5d894_id_dialog_context",
    //                     lifespan : 0
    //                     },
    //                     {
    //                     name  : "market_alert_contextout",
    //                     lifespan : 0    
    //                 }],
    //                 followupEvent : {
    //                     data : {
    //                         alert_if : alert_if,
    //                         exchange : exchange,
    //                         less_than_greater_than : less_than_greater_than,
    //                         scripnames : scripnames,
    //                         value : value
    //                     },
    //                     name : "market_alert_event_followup"
    //                 }
    //             });
    //         }
    //         break;
            
    //     case "orderbook_scrip_specific" : //case statement-------------------------------------------
            
    //         var orderbook_fields = req.body.result.parameters.orderbook_fields;
    //         var scripnames = req.body.result.parameters.scripnames;
    //         inputText = inputText.toUpperCase();
    //         inputText = inputText.replace(orderbook_fields.toUpperCase() , "");
    //         inputText = inputText.replace("ORDERBOOK" , "");
    //         inputText = inputText.replace("ORDER BOOK" , "");
    //         inputText = inputText.replace("ORDERS" , "");
    //         inputText = inputText.replace("ORDER" , "");
   
    //         for(var i=0 ; i < scrips.length ; i++){                                    //checking for validity of scrip name
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1){
    //                 var j = (inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase());
    //                 if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD1).length] === " " || inputText.endsWith(scrips[i].FIELD1)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1){
    //                     var j = (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase());
    //                     if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD2).length] === " " || inputText.endsWith(scrips[i].FIELD2)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //         }  
    //         if(scripnames === "")
    //             return res.json({                                   // returning scripname
    //                 contextOut : [{
    //                     name : "orderbook_scrip_specific_contextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     }
    //                 }]
    //             });
    //         return res.json({                                   // returning final output using followupEvent
    //             contextOut : [{
    //                 name : "orderbook_scrip_specific_contextout",
    //                 lifespan : 0
    //             },
    //             {
    //                 name : "84bc8d81-4673-4cfe-8048-d83bf239f72e_id_dialog_context",
    //                 lifespan : 0          
    //             },
    //             {
    //                 name : "orderbook-scrip_specific_dialog_context",
    //                 lifespan : 0
    //             }],
    //             followupEvent : {
    //                 data : {
    //                     orderbook_fields : orderbook_fields,
    //                     scripnames  : scripnames
    //                 },
    //                 name : "orderbook_scrip_specific_event_followup"
    //             }
    //         });
    //         break;
            
    //     case "positions_scrip_specific" : //case statement--------------------------------------------
            
    //         var scripnames = req.body.result.parameters.scripnames;
    //         inputText = inputText.toUpperCase();
    //         inputText = inputText.replace("POSITIONS" , "");
    //         inputText = inputText.replace("POSITION" , "");
          
    //         for(var i=0 ; i < scrips.length ; i++){                              //checking validity of scrip name
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1){
    //                 var j = (inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase());
    //                 if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD1).length] === " " || inputText.endsWith(scrips[i].FIELD1)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1){
    //                     var j = (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase());
    //                     if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD2).length] === " " || inputText.endsWith(scrips[i].FIELD2)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //         }  
    //         if(scripnames === "")
    //             return res.json({
    //                 contextOut : [{
    //                     name : "positions_scrip_specific_contextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     }
    //                 }]
    //             });
    //         return res.json({                                             //returning final output using followupEvent
    //             contextOut : [{
    //                 name : "positions_scrip_specific_contextout",
    //                 lifespan : 0
    //             },
    //             {
    //                 name : "dcb4cb9a-2a48-459f-9ee0-f5866f19c4de_id_dialog_context",
    //                 lifespan : 0          
    //             },
    //             {
    //                 name : "positions-scrip_specific_dialog_context",
    //                 lifespan : 0
    //             }],
    //             followupEvent : {
    //                 data : {
    //                     scripnames  : scripnames
    //                 },
    //                 name : "positions_scrip_specific_event_followup"
    //             }
    //         });
    //         break;
            
    //     case "tradebook_scrip_specific" : //case statement----------------------------------------
            
    //         var scripnames = req.body.result.parameters.scripnames;
    //         inputText = inputText.toUpperCase();
    //         inputText = inputText.replace("TRADEBOOK" , "");
    //         inputText = inputText.replace("TRADE BOOK" , "");
    //         inputText = inputText.replace("TRADES" , "");
    //         inputText = inputText.replace("TRADE" , "");
     
    //         for(var i=0 ; i < scrips.length ; i++){                                 //checking validity of scrip name
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1){
    //                 var j = (inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase());
    //                 if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD1).length] === " " || inputText.endsWith(scrips[i].FIELD1)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1){
    //                     var j = (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase());
    //                     if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD2).length] === " " || inputText.endsWith(scrips[i].FIELD2)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //         }  
    //         if(scripnames === "")                                         //returning scrip name
    //             return res.json({
    //                 contextOut : [{
    //                     name : "tradebook_scrip_specific_contextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     }
    //                 }]
    //             });
    //         return res.json({                                               //returning final output with followupEvent
    //             contextOut : [{
    //                 name : "tradebook_scrip_specific_contextout",
    //                 lifespan : 0
    //             },
    //             {
    //                 name : "e34d58c9-7f41-4fd5-ad1c-d4260ba38bbd_id_dialog_context",
    //                 lifespan : 0          
    //             },
    //             {
    //                 name : "tradebook-scrip_specific_dialog_context",
    //                 lifespan : 0
    //             }],
    //             followupEvent : {
    //                 data : {
    //                     scripnames  : scripnames
    //                 },
    //                 name : "tradebook_scrip_specific_event_followup"
    //             }
    //         });
    //         break;
            
    //     case "quoteAction" : //case statement------------------------------------------------
           
    //         var chart_type = req.body.result.parameters.chart_type;
    //         var exchange = req.body.result.parameters.exchange;
    //         var quotes_fields = req.body.result.parameters.quotes_fields;
    //         var scripnames = req.body.result.parameters.scripnames;
    //         var exchange_possibilities = "The stock you have chosen is not available on ";
    //         exchange_possibilities = exchange_possibilities.concat(exchange);
    //         exchange_possibilities = exchange_possibilities.concat(". Please choose from the following :");
    //         inputText = inputText.toUpperCase();
    //         inputText = inputText.replace(chart_type.toUpperCase() , "");       //removing some keywords to simplify search string
    //         inputText = inputText.replace(exchange.toUpperCase() , "");
    //         inputText = inputText.replace(quotes_fields.toUpperCase() , "");
    //         inputText = inputText.replace("QUOTES" , "");
    //         inputText = inputText.replace("QUOTE" , "");
    //         inputText = inputText.replace("TODAY'S" , "");
    //         inputText = inputText.replace("TODAYS" , "");
    //         inputText = inputText.replace("TODAY" , "");
    //         inputText = inputText.replace("DAY" , "");
    //         inputText = inputText.replace("THE" , "");
     
    //  /*       for(var i=0 ; i < scrips.length ; i++){                        //checking for validity of scrip name
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1){
    //                 var j = (inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase());
    //                 if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD1).length] === " " || inputText.endsWith(scrips[i].FIELD1)))
    //                 scripnames = scrips[i].FIELD3;
    //             }
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1){
    //                     var j = (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase());
    //                     if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD2).length] === " " || inputText.endsWith(scrips[i].FIELD2)))
    //                 scripnames = scrips[i].FIELD3;
    //             } 
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD3).toLowerCase()) !== -1){
    //                     var j = (inputText.toLowerCase()).search((scrips[i].FIELD3).toLowerCase());
    //                     if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD3).length] === " " || inputText.endsWith(scrips[i].FIELD3)))
    //                 scripnames = scrips[i].FIELD3;
    //             }
    //    */
    //          var scriplist1 = [];
    //         var scriplist2 = [];
    //         var flag=0; 
    //         for(var i=0 ; i< scrips.length ; i++){
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1){
    //                     var j = (inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase());
    //                     console.log("IF1 entered : "); 
    //                     if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD1).length] === " " || (inputText.toLowerCase()).endsWith((scrips[i].FIELD1).toLowerCase()))){
    //                         console.log("IF2 entered : "); 
    //                 scriplist1.push(scrips[i].FIELD1);
    //                 scriplist2.push(scrips[i].FIELD3);
    //                 flag=1;
    //                     }
    //             }
    //         }
    //         for(var i=0 ; i < scrips.length ; i++){                   // Checks for scrip validity 
    //             if(flag===1)
    //                 break;
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1){
    //                     var j = (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase());
    //                     if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD2).length] === " " || (inputText.toLowerCase()).endsWith((scrips[i].FIELD2).toLowerCase()))){
    //                 scriplist1.push(scrips[i].FIELD1);
    //                 scriplist2.push(scrips[i].FIELD3);
    //                     }
    //             }
    //             else if((inputText.toLowerCase()).search((scrips[i].FIELD3).toLowerCase()) !== -1){
    //                 var j = (inputText.toLowerCase()).search((scrips[i].FIELD3).toLowerCase());
    //                 if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD3).length] === " " || (inputText.toLowerCase()).endsWith((scrips[i].FIELD3).toLowerCase()))){
    //                 scriplist1.push(scrips[i].FIELD1);
    //                 scriplist2.push(scrips[i].FIELD3);
    //                 }
    //             }
    //           else{
    //               inputText = inputText.replace("OF", "");          // Identify and Remove other stockwords
    //                 var scripwords = inputText.split(" ");
    //             for(var k = 0 ; k < scripwords.length ; k++){
    //                 if((scrips[i].FIELD1.toLowerCase()).search((scripwords[k]).toLowerCase()) !== -1 && scripwords[k] !== ""){
    //                    var j = ((scrips[i].FIELD1).toLowerCase()).search((scripwords[k]).toLowerCase());
    //                    if((scrips[i].FIELD1[j-1] === " " || j === 0) && ((scrips[i].FIELD1)[j + (scripwords[k]).length] === " " || ((scrips[i].FIELD1).toLowerCase()).endsWith((scripwords[k]).toLowerCase()))){
    //                    scriplist1.push(scrips[i].FIELD1);
    //                    scriplist2.push(scrips[i].FIELD3);
    //                    }
    //                 }
    //                 //if(scriplist1.length === 1)
    //                 //   break;
    //             }
    //           }
    //         }  
    //         if(scriplist1.length === 1)
    //             scripnames = scriplist2[0];
    //         else if(scriplist1.length > 1){
    //             var scripstring = "The string you have entered matches the following scrips :";
    //             for(i=0 ; i < scriplist1.length ; i++){
    //                 scripstring = scripstring.concat("\n");
    //                 scripstring = scripstring.concat(scriplist1[i]);
    //             }
    //             scripstring = scripstring.concat(". Please type in one");
    //             return res.json({
    //                 contextOut : [{
    //                     name : "tradecontextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     }
    //                 }],
    //                 speech : scripstring,
    //                 displayText : scripstring
    //             });
    //         }
       
    //         if(exchange === "")
    //             return res.json({
    //                 contextOut : [{
    //                     name : "quotes_contextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     }
    //                 }]
    //             });  
           
            
    //         var exchange_scrip_match = 0;                              //checking if exchange name matches
    //         if(exchange !== "" && scripnames !== ""){
    //             for(var i=0 ; i < scrips.length ; i++){
    //                 if(scripnames === scrips[i].FIELD3){
    //                     exchange_possibilities = exchange_possibilities.concat(" ");
    //                     exchange_possibilities = exchange_possibilities.concat(scrips[i].FIELD4);
    //                     if((exchange.toUpperCase()) === scrips[i].FIELD4){
    //                         exchange_scrip_match = 1;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //         if(exchange_scrip_match === 0 && scripnames !== "")    //if exchange doesn't match then returning appropriate response
    //             return res.json({
    //                 contextOut : [{
    //                     name : "quotes_contextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     }
    //                 }],
    //                 speech : exchange_possibilities,
    //                 displayText : exchange_possibilities
    //             });
    //         if(scripnames !== "" && exchange !== ""){
                
    //             return res.json({                                               //returning final output using followupEVent
    //                 contextOut : [{
    //                     name : "quotes_dialog_context",
    //                     lifespan : 0
    //                     },
    //                     {
    //                     name : "428bcd2f-87fb-4e59-8035-89ad86ab6b10_id_dialog_context",
    //                     lifespan : 0  
    //                     },
    //                     {
    //                     name : "quotes_contextout",
    //                     lifespan : 0    
    //                 }],
    //                 followupEvent : {
    //                     data : {
    //                         exchange : exchange,
    //                         chart_type : chart_type,
    //                         scripnames : scripnames,
    //                         quotes_fields : quotes_fields
    //                     },
    //                     name : "quotes_event_followup"
    //                 }
    //             });
    //         }
    //         break;
            
    //     case "marketwatch_add_scrip" :  //case statement------------------------------------------
            
    //         var scripnames = req.body.result.parameters.scripnames;
    //         var marketwatch = req.body.result.parameters.marketwatch;
    //         inputText = inputText.toUpperCase();
    //         inputText = inputText.replace(marketwatch.toUpperCase , "");
    //         inputText = inputText.replace("MARKET WATCH" , "");
    //         inputText = inputText.replace("MARKETWATCH" , "");
    //         inputText = inputText.replace("ADD" , "");
    //         for(var i=0 ; i < scrips.length ; i++){                                   //checking for validity of scrip name
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1){
    //                 var j = (inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase());
    //                 if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD1).length] === " " || inputText.endsWith(scrips[i].FIELD1)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1){
    //                     var j = (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase());
    //                     if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD2).length] === " " || inputText.endsWith(scrips[i].FIELD2)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //         }  
    //         if(scripnames === "")                                       //returning scrip name
    //             return res.json({
    //                 contextOut : [{
    //                     name : "marketwatch_add_scrip_contextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     }
    //                 }]
    //             });
    //         return res.json({                                                 //final return statement with followupEvent
    //             contextOut : [{
    //                 name : "marketwatch_add_scrip_contextout",
    //                 lifespan : 0
    //             },
    //             {
    //                 name : "e544710f-2234-4068-8012-19ea2917eb0c_id_dialog_context",
    //                 lifespan : 0          
    //             },
    //             {
    //                 name : "marketwatch-add_scrip_dialog_context",
    //                 lifespan : 0
    //             }],
    //             followupEvent : {
    //                 data : {
    //                     scripnames  : scripnames,
    //                     marketwatch : marketwatch
    //                 },
    //                 name : "marketwatch_add_scrip_event_followup"
    //             }
    //         });
    //         break;
            
    //     case "marketwatch_remove_scrip" : //case statement------------------------------------------------------------
            
    //         var scripnames = req.body.result.parameters.scripnames;
    //         var marketwatch = req.body.result.parameters.marketwatch;
    //         inputText = inputText.toUpperCase();
    //         inputText = inputText.replace(marketwatch.toUpperCase , "");
    //         inputText = inputText.replace("MARKET WATCH" , "");
    //         inputText = inputText.replace("MARKETWATCH" , "");
    //         inputText = inputText.replace("REMOVE" , "");
    //         for(var i=0 ; i < scrips.length ; i++){                             //checking validity of scrip name
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1){
    //                 var j = (inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase());
    //                 if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD1).length] === " " || inputText.endsWith(scrips[i].FIELD1)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //             if((inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1){
    //                     var j = (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase());
    //                     if((inputText[j-1] === " " || j === 0) && (inputText[j + (scrips[i].FIELD2).length] === " " || inputText.endsWith(scrips[i].FIELD2)))
    //                 scripnames = scrips[i].FIELD1;
    //             }
    //         }  
    //         if(scripnames === "")                                         //returrning scrip name
    //             return res.json({
    //                 contextOut : [{
    //                     name : "marketwatch_remove_scrip_contextout",
    //                     parameters : {
    //                         scripnames : scripnames
    //                     }
    //                 }]
    //             });
    //         return res.json({                                           //final return statement with followupEvent
    //             contextOut : [{
    //                 name : "marketwatch_remove_scrip_contextout",
    //                 lifespan : 0
    //             },
    //             {
    //                 name : "2c95a433-4596-4ab2-bb9c-2e6222d975b3_id_dialog_context",
    //                 lifespan : 0          
    //             },
    //             {
    //                 name : "marketwatch-remove_scrip_dialog_context",
    //                 lifespan : 0
    //             }],
    //             followupEvent : {
    //                 data : {
    //                     scripnames  : scripnames,
    //                     marketwatch : marketwatch
    //                 },
    //                 name : "marketwatch_remove_scrip_event_followup"
    //             }
    //         });
    //         break;

    }//switch case end
});//post() method end
 
restService.listen((process.env.PORT || 8001), function() {
     console.log("Server up and listening");
     });
//server.timeout = 1000;