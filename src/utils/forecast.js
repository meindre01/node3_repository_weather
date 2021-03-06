const request = require('request')
const forecast = (latitude,longitude,callback)=>{
  
    const url = 'http://api.weatherstack.com/current?access_key=5267ebebba415f9180cefd1013031090&query=' + latitude + ',' + longitude

    request({url : url,json : true},(error, {body})=>{
       if(error){
           callback('Unable to connect to service server !', undefined)
       }else if(body.error){
           callback('Unable to find your location. Try another search !', undefined)
       }else{
          
           callback(undefined,
             body.current.weather_descriptions + ' Temperature sekarang adalah ' + body.current.temperature + ' derajat C ,terasa seperti ' + body.current.feelslike + ' derajat C dengan kelembapan ' + body.current.humidity + '% dan kecepatan angin ' + body.current.wind_speed + ' km/jam', 
               
             )
       } 
    })
}

module.exports = forecast
