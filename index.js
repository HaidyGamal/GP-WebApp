// make the server up and running
const express = require('express');
const app = express();
// to work with dirictories
const path = require('path');
// to create reusable code in the ejs files
const ejsMate = require('ejs-mate');
// to override methods
const methodOverride = require('method-override');
// to use our API with the help of axios
const axios = require("axios");
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
        let stops = [];
        const options = {
          method: 'GET',
          url: 'https://samplepublictransportationsapi.onrender.com/',
          headers: {
            'Accept-Encoding': 'null'
          }
        };
        axios.request(options).then(function (response) {
          for(let i = 0 ; i<response.data.allNodes.length; i++){
            stops.push(
              response.data.allNodes[i].name
            )
          }
          res.render('pages/webVersion.ejs', {stops : stops});
        }).catch(function (error) {
          console.error(error);
        });
        // res.render('pages/webVersion.ejs');
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



// // path result page
// app.post(
//     '/webVersion/result',
//     (req, res)=>{
//       let location = req.body.Location
//       let destination = req.body.Destination
//       const options = {
//         method: 'POST',
//         url: 'https://samplepublictransportationsapi.onrender.com/showResult',
//         headers: {
//           'content-type': 'application/json',
//           'Accept-Encoding': 'null'
//         },
//         data: `{"Location":"${location}","Destination":"${destination}"}`
//       };
      
//       axios.request(options).then(function (response) {
//         let numberOfAvailablePaths = response.data.recordsLength
//         let numberOfPathStops = response.data.length
//         let lastStop = response.data.endNode
//         let routeNumber = 1
//         let allPathsCombined = []
//         let routes = []
//         // to store all paths in one continous array without filtering each route separately
//         for(let i = 0 ; i< numberOfAvailablePaths ; i++){
//           for(let j = 0 ; j< numberOfPathStops ; j++){
//             allPathsCombined.push({
//               name: response.data.routes[i][j].name,
//               lineNumber: response.data.routes[i][j].lineNumber
//             })
//           }
//         }
//         // filtering routes from the collected allPathsCombined array
//         let k = numberOfPathStops
//         for(let i = 0 ; i < allPathsCombined.length ; i = i+numberOfPathStops){
//           routes.push(allPathsCombined.slice(i , k))
//           k = k + numberOfPathStops
//         }
//         res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths });
//       }).catch(function (error) {
//         console.error(error);
//       });
//         // res.render('pages/result.ejs');
//     }
// )
// //reult details page
// app.post(
//     '/webVersion/result/resultDetails/:id',
//     (req, res)=>{
//       const id = req.params.id
//     let location = req.query.Location
//     let destination = req.query.Destination
//     const options = {
//       method: 'POST',
//       url: 'https://samplepublictransportationsapi.onrender.com/showResult',
//       headers: {
//         'content-type': 'application/json',
//         'Accept-Encoding': 'null'
//       },
//       data: `{"Location":"${location}","Destination":"${destination}"}`
//     };
    
//     axios.request(options).then(function (response) {
//       let numberOfAvailablePaths = response.data.recordsLength
//       let numberOfPathStops = response.data.length
//       let lastStop = response.data.endNode
//       let routeNumber = 1
//       let allPathsCombined = []
//       let routes = []
//       // to store all paths in one continous array without filtering each route separately
//       for(let i = 0 ; i< numberOfAvailablePaths ; i++){
//         for(let j = 0 ; j< numberOfPathStops ; j++){
//           allPathsCombined.push({
//             name: response.data.routes[i][j].name,
//             lineNumber: response.data.routes[i][j].lineNumber
//           })
//         }
//       }
//       // filtering routes from the collected allPathsCombined array
//       let k = numberOfPathStops
//       for(let i = 0 ; i < allPathsCombined.length ; i = i+numberOfPathStops){
//         routes.push(allPathsCombined.slice(i , k))
//         k = k + numberOfPathStops
//       }
//       res.render('pages/resultDetails.ejs' , {id , routes , numberOfPathStops  , lastStop});
//     }).catch(function (error) {
//       console.error(error);
//     });
//         // res.render('pages/resultDetails.ejs');
//     }
// );

// orderByCost
app.post(
  '/webVersion/result/orderByCost',
  (req , res)=>{
    let location = req.body.Location
    let destination = req.body.Destination
    const options = {
      method: 'POST',
      url: 'https://samplepublictransportationsapi.onrender.com/orderByCost',
      headers: {
        'content-type': 'application/json',
        'Accept-Encoding': 'null'
      },
      data: `{"Location":"${location}","Destination":"${destination}"}`
    };
    // to check if you are in the /showResult/orderByDistance/ path
    let currentURL = "/webVersion/result/orderByCost"
    let currentOrder = "طريقك مرتب بحسب السعر"
    axios.request(options).then(function (response) {
      let numberOfAvailablePaths = response.data.length
      let data = response.data
      let routeNumber = 1
      res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder});
    }).catch(function (error) {
      console.error(error);
    });
    
  }
)
// orderByCost details
app.post(
  '/webVersion/result/orderByCost/resultDetails/:id',
  (req , res)=>{
    const id = req.params.id
    let location = req.query.Location
    let destination = req.query.Destination
    const options = {
      method: 'POST',
      url: 'https://samplepublictransportationsapi.onrender.com/orderByCost',
      headers: {
        'content-type': 'application/json',
        'Accept-Encoding': 'null'
      },
      data: `{"Location":"${location}","Destination":"${destination}"}`
    };
    
    axios.request(options).then(function (response) {
      let numberOfAvailablePaths = response.data.length
      let data = response.data
      res.render('pages/resultDetails.ejs' , {id  , numberOfAvailablePaths , data});
    }).catch(function (error) {
      console.error(error);
    });
  }
)
// orderByDistance
app.post(
  '/webVersion/result/orderByDistance',
  (req , res)=>{
    let location = req.body.Location
    let destination = req.body.Destination
    const options = {
      method: 'POST',
      url: 'https://samplepublictransportationsapi.onrender.com/orderByDistance',
      headers: {
        'content-type': 'application/json',
        'Accept-Encoding': 'null'
      },
      data: `{"Location":"${location}","Destination":"${destination}"}`
    };
    // to check if you are in the /showResult/orderByDistance/ path
    let currentURL = "/webVersion/result/orderByDistance"
    let currentOrder = "طريقك مرتب بحسب المسافة"
    axios.request(options).then(function (response) {
      let numberOfAvailablePaths = response.data.length
      let data = response.data
      let routeNumber = 1
      res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL, currentOrder});
    }).catch(function (error) {
      console.error(error);
    });
    
  }
)
// orderByDistance details
app.post(
  '/webVersion/result/orderByDistance/resultDetails/:id',
  (req , res)=>{
    const id = req.params.id
    let location = req.query.Location
    let destination = req.query.Destination
    const options = {
      method: 'POST',
      url: 'https://samplepublictransportationsapi.onrender.com/orderByDistance',
      headers: {
        'content-type': 'application/json',
        'Accept-Encoding': 'null'
      },
      data: `{"Location":"${location}","Destination":"${destination}"}`
    };
    
    axios.request(options).then(function (response) {
      let numberOfAvailablePaths = response.data.length
      let data = response.data
      res.render('pages/resultDetails.ejs' , {id  , numberOfAvailablePaths , data});
    }).catch(function (error) {
      console.error(error);
    });
  }
)
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