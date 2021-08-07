

const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");

const app=express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityname;
  const apikey="b9e6dea587fe40640262cd34e9d5c686";
const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;



  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
  const weatherdata=JSON.parse(data);
  // console.log(weatherdata);
  // const object = {
  //   name: "Shreya" ,
  //   favfood:"Pizza"
  //
  // }
  // console.log(JSON.stringify(object));
  const temp=weatherdata.main.temp;
  const weatdes=weatherdata.weather[0].description;//here weather is an array of size=1
  const icon=weatherdata.weather[0].icon;
  const imurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";

  res.write("<h1>The temperature in "+query+" is "+temp+" degree Celcius");
  res.write("<h3>The weather description is "+weatdes);
  res.write("<img src="+imurl+">");
  res.send();

    })
  })

});



app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
