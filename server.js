const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Not able to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    //res.send('<h1>Express Test...</h1>');
    //res.send({name:'Test', liked:['food', 'game']});
    res.render('home.hbs', {
        pageTitle:'Home Page',
        welcomeMsg:"Welcome !!"
    });
});


app.get('/about', (req,res)=>{
    //res.send('<h1>About</h1>');
    res.render('about.hbs', {
        pageTitle:'About Page'
    });
});

app.get('/projects', (req,res)=>{
    res.render('projects.hbs', {
        pageTitle:'Projects Page'
    });
});

app.get('/bad', (req,res)=>{
    res.send({errorMessage:'Not a valid request'});
});

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
});