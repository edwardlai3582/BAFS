'use strict'

//first we import our dependencies...
var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var bodyParser = require('body-parser');
var axios = require('axios');
var jwt = require('jsonwebtoken');

var User = require('./models/user');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

//db config
mongoose.connect(config.dbLocation);
mongoose.Promise = bluebird;

app.set('superSecret', config.secret); // secret variable

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
/*
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
*/

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//facebook login
router.route('/authenticate')
  .get(function(req, res) {
    //console.log(req.query.token);
    axios.get(`https://graph.facebook.com/me?fields=id,name,picture,email&access_token=${req.query.token}`)
      .then((response)=> {
        console.log(response.data);
        User.findOne({ 'fbid' : response.data.id }, function(err, user) {
            if (err) {
              res.json({message:'findOne failed'});
              console.log(err);
            }

            if (user) {
              // if user is found and password is right
              // create a token
              var token = jwt.sign(user, app.get('superSecret'), {
                expiresIn : 60 * 60 * 1// expires in 1 hours
              });

              // return the information including token as JSON
              res.json({
                success: true,
                fbid: user.fbid,
                token: token
              });
            }
            else {
              // if there is no user found with that facebook id, create them
              var newUser = new User();

              // set all of the facebook information in our user model
              newUser.fbid    = response.data.id;
              //newUser.facebook.token = token;
              newUser.fbname  = response.data.name;
              newUser.fbemail = response.data.email;
              newUser.fbpicture = response.data.picture.data.url;
              // save our user to the database
              newUser.save(function(err) {
                  if (err) {
                    res.json({message:'create new user failed'});
                  }
                  else {
                    // if successful, return the new user
                    var token = jwt.sign(newUser, app.get('superSecret'), {
                      expiresIn: 60 * 60 * 1// expires in 1 hours
                    });

                    // return the information including token as JSON
                    res.json({
                      success: true,
                      fbid: newUser.fbid,
                      token: token
                    });
                  }
              });
            }

        });
      })
      .catch(function (error) {
        console.log(error);
        res.json({message:'FB login failed'});
      });
  });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
