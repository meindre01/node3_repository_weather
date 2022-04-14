const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serv
app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Indra Permana'
    })
})

app.get('/product',(req,res)=>{
   if(!req.query.search){
      return res.send({
           message : 'You have to provide a search term ! '
       })
   }
    console.log(req.query.search)
    res.send({ 
        product : []
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Indra Permana'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help page',
        name : 'Indra Permana'
    })
})

app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({ message : 'You must to provide the address !'})
   }

   geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
       if(error){
           return res.send({ error : error})
       }
       forecast(longitude,latitude,(error, data)=>{
           if(error){
               return res.send({error : error})
           }
           res.send({
               address : req.query.address,
               forecast : data,
               location : location
           })
       })
   })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Indra Permana',
        errorMessage : 'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404', 
        name : 'Indra Permana',
        errorMessage : 'Page not found'
    })
})



app.listen(port,()=>{
    console.log('Server is up on port 3000' + port)
})