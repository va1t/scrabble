var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
var app = express();

//parses incoming data to json
app.use(bodyParser.urlencoded({ extended: false} ));
app.use(bodyParser.json());

//Fixes Cors issues for localhost
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Test our server to see if it is live
app.get('/', function (req, res) {
  res.sendStatus(200);
});

//Main logic for Scrabble. 
app.post('/scrabble', function (req, res) {
  console.log(req.body)
  getScrabbleWords(req.body.input, function(err, data) {
    if(err) {
      res.status(500).send({
        'data': 'There was an error on the server.'
      });
    } else {
      res.status(200).send({
        'data': data
      });
    }
  });
});

//Listen on port 3000
app.listen(3000, function () {
  console.log('listening on port 3000');
});

//Grabbing words for scrabble
function getScrabbleWords(input, callback) {
  fs.readFile('./dictionary.txt', 'utf8', function (err, content) {
    if(err) {
      callback(err, null);
      console.log('Error: ', err);
    } else {
      var contentArray = content.split('\n');
      var lowerCaseInput = input.toLowerCase();
      var output = [];
      
      contentArray.forEach(function(element) {
        var lowerCaseOutput = element.toLowerCase();
        var re = '/'+lowerCaseOutput+'.*/';
        if(lowerCaseInput.match(re)) {
            output.push(element);
        }

      });
      console.log('output', output);
      console.log(contentArray.length);
      callback(null, contentArray);
    }
  });
}

