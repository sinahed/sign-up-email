const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

   const data = {

    members: [ 
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          }
        }
      ]
   }

const jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/b6cfb21c69"; 
   
   const options = {
   method: "POST",
   auth: "sina1:13687623c189c178ce5db35a9b79ddfe-us21"

   }

   const request = https.request(url, options , function(response) {
     
    if (response.statusCode === 200 ) {

      res.sendFile(__dirname + "/success.html");

    } else {

        res.sendFile(__dirname + "/failure.html");
    }



     response.on("data", function(data){
        console.log(JSON.parse(data));
     })

   })

   request.write(jsonData);
   request.end();

});



app.post("/failure.html", function(req,res){

    res.redirect("/");
})



app.listen(3000,function(){
    console.log("server is run on port 3000");
})



// API 13687623c189c178ce5db35a9b79ddfe-us21


// list ID  b6cfb21c69