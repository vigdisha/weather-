const { response } = require("express");
const express = require("express");
const https = require("https");
const app = express();
require('dotenv').config();
//body Parser
app.use(express.urlencoded({extended: true}));

//public folder
 app.use(express.static(__dirname + "/public"));

console.log(process.env.API_KEY);
//fetch data
app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
});
//update data
app.post("/", function(req,res){
   const query = req.body.cityName;
    const apikey = process.env.API_KEY;
    const units = "metric";
     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid="+apikey + "&units="+units;
//Get Status:
     https.get(url, function(response){
         console.log(response.statusCode);


         response.on("data", function(data){
         const weatherData =  JSON.parse(data);
         const temp = weatherData.main.temp;
         const weatherDescription = weatherData.weather[0].description;
         const icon =weatherData.weather[0].icon
        const  imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
     //     res.write("<h1>The temperature in "+query + " is " + temp + " degree celcius.</h1>");
     //     res.write("<p>The weather is currently " + weatherDescription+ "</p>");
     //     res.write("<img src="  + imageurl + ">");
     res.write('<head><meta charset="utf-8"><title>Weather App</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"><link href="style.css" rel="stylesheet"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></head>');
     res.write('<body><div class="heading">')
     res.write("<h1>The temperature in " + query + " is " + temp +  " degrees Celsius.</h1>");
     res.write("<h2>The weather is curently: " + weatherDescription + ".</h2>");
     res.write("<img class='vert-move weather-image' src=" + imageurl + ">");
     res.write('<p class="lead"><button class="btn btn-dark btn-lg home-button" type="submit" onclick="javascript:history.go(-1)" name="button">Go To Homepage</button></p>');
     res.write("</div></body>")
         res.send();
         })
     }); 

})



app.listen(3000);
