const { response } = require("express");
const express = require("express");
const https = require("https");
const app = express();
require('dotenv').config();
//body Parser
app.use(express.urlencoded({extended: true}));

console.log(process.env.API_KEY);
app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
   const query = req.body.cityName;
    const apikey = process.env.API_KEY;
    const units = "metric";
     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid="+apikey + "&units="+units;

     https.get(url, function(response){
         console.log(response.statusCode);


         response.on("data", function(data){
         const weatherData =  JSON.parse(data);
         const temp = weatherData.main.temp;
         const weatherDescription = weatherData.weather[0].description;
         const icon =weatherData.weather[0].icon
        const  imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
         res.write("<h1>The temperature in "+query + " is " + temp + " degree celcius.</h1>");
         res.write("<p>The weather is currently " + weatherDescription+ "</p>");
         res.write("<img src="  + imageurl + ">");
         res.send();
         })
     }); 

})


app.listen(3000);