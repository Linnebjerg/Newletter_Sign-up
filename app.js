
const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");

const app = express();

app.use(bodyParser.urlencoded ({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile (__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.inputFirst;
  var lastName = req.body.inputLast;
  var email = req.body.inputEmail;

  var data = {
    members: [
      {email_address: email,
        status: "subscribed",
        merge_fields:{
        FNAME: firstName,
        LNAME: lastName
        }
      }
    ]
  };

var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/c15cdcfa4a",
    method: "POST",
    headers: {
      "Authorization": "dD 089f56e4115d8769afff324febfc88ef-us4"
    },
    body: jsonData
  };

request (options, function(error, response,  body){
  if (error) {
    res.sendFile(__dirname + "/failure.html");
  } else {
    if (response.statusCode === 200) {
          res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log ("Server is now running on port 3000");
});
