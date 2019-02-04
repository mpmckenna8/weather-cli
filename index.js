// calls to weather api

let request = require('request');
var colors = require('colors');


let apiKey = require('./config.js').apikey
let city = process.argv[2] || 'San Francisco';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`



request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('body:', body);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
    let rain = "☔️"
    let fog = "🌫"
    let data = JSON.parse(body)
    console.log('data:', data);

    let data_time = new Date(data.dt * 1000);
    let timeString = months[ data_time.getMonth() ] + '  ' + data_time.getDate() + ',  '  + data_time.getHours() + ':' + data_time.getMinutes() 
    console.log('data collection time, ', data_time)
    console.log(timeString)
    
    
    
    let header = `weather for ${city}`
    console.log(header.bold)
    let description = data.weather
    for( i of description ) { 
      console.log("it's ", i.description)
      if( i.description === "shower rain" ) {
        console.log(rain)
      }
      if (i.description === 'mist') {
        console.log(fog)
      }
    }
    let temperature = data.main.temp - 273.15
    let tempString = "Temperature: " + temperature + " degrees celcius"
    let humidity_string = "Humidity: " + data.main.humidity + "%"
    console.log(tempString.magenta.bgBlack)
    console.log(humidity_string)
  }
});