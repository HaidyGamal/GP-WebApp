// make the server up and running
const express = require('express');
const app = express();
// to work with dirictories
const path = require('path');
// to create reusable code in the ejs files
const ejsMate = require('ejs-mate');
// to override methods
const methodOverride = require('method-override');
// making /views folder accesable from any path
app.set('views', path.join(__dirname, '/views'));
// to include EJS
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
// using method override
app.use(methodOverride('_method'));
// to be able to use files inside /public
app.use(express.static(__dirname + '/public'));
//using ejs-mate package
app.engine('ejs', ejsMate);

// Website Home Page
app.get(
    '/',
    (req, res)=>{
        res.render('pages/home.ejs');
    }
);
// Web Version Home
app.get(
    '/webVersion',
    (req, res)=>{
        res.render('pages/webVersion.ejs');
    }
);
// contact us page
app.get(
    '/webVersion/contact',
    (req, res)=>{
        res.render('pages/contact.ejs');
    }
);
// About page
app.get(
    '/webVersion/about',
    (req,res) =>{
        res.render('pages/about.ejs');
    }
);
// path result page
app.get(
    '/webVersion/result',
    (req, res)=>{
        res.render('pages/result.ejs');
    }
)
//reult details page
app.get(
    '/webVersion/result/resultDetails',
    (req, res)=>{
        res.render('pages/resultDetails.ejs');
    }
);
//live location page
app.get(
    '/resultDetails/liveLocation',
    (req, res)=>{
        res.render('pages/liveLocation.ejs')
    }
);
// add new route page
app.get(
    '/webVersion/newRoute',
    (req, res)=>{
        res.render('pages/newRoute.ejs');
    }
)
// Settings page
app.get(
    '/webVersion/settings',
    (req, res)=>{
        res.render('pages/settings.ejs');
    }
)


// listen on local host port
app.listen(3000,()=>{console.log('Listening on port 3000')});