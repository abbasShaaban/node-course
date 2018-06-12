/**
 * Created by Student on 12/06/2018.
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear();
});
app.set('view engine','hbs');
app.use((req,res,next)=>{
   let now = new Date().toString();

  let log =  `${now}: ${req.method} ${req.url}`;
   fs.appendFile('server.log',log +'\n',(err)=>{
       if(err)
           console.log('un able to append to server.log');
   });

   next();
});

app.use((req,res,next)=>{
        res.render('maintenance.hbs');
});
app.use(express.static(__dirname+ '/public'));

app.get('/',(request, response)=>{
        response.render('welcome.hbs',{
            pageTitle: 'Welcome : )',
            welcomeMessage: 'Hi heheheh : )'
        })
    }
);
app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        pageTitle: 'About Page',
    });
});
app.get('/bad',(request,response)=>{
    response.send({
        error: 'bad request'
    });
});
app.listen(3000,() =>{
    console.log('server is up on port 3000');
});