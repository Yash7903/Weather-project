const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const https = require("https");

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res){

  const query = req.body.cityName ;
  const appkey = "870b40da29510edcfabb9e967e1342c9";
  const http = ("https://api.openweathermap.org/data/2.5/weather?q="+ query +",BR,+91&appid="+ appkey +"&units=metric");

  https.get(http, function(response){
    console.log(response.statusCode);

    response.on('data',function(data)
  {
    const weatherData = JSON.parse(data);
    const temp =weatherData.main.temp;
    const humidity = weatherData.weather[0].description;
    const url = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
    // console.log("Todays temp forscast");
    // console.log(temp);
    // console.log(humidity);
  res.write("<h1>Tempeature of " + query +" is "+temp + "degree celcius</h1>");
  res.write("<h1>The Weather is currently " + humidity + ".</h1>");
  res.write("<img src="+ url +">");
  res.send();
});
});
});






app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
