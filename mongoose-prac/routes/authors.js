var express = require('express');
var router = express.Router();
const Author = require('../models/author');

/* GET authors listing. */
router.get('/', function(req, res, next) {
  // Create new author
  const pat = new Author({
    first_name: 'Pat',
    family_name: 'Rufus',
    date_of_birth: '1973-06-06',
    date_of_death: '2001-01-03',
    phone: '310-555-7170'
  });

  // Call instance method
  pat.sayName();

  // Call another instance method
  // not sure what query is or what is being logged
  console.log('calling identify()');
  pat.identify( function(err, query) {
    //console.log(query);
  });

  // Use a custom query helper fn
  Author.find().byName('pat').exec(function(err, authors) {
    //console.log('results of query helper fn: ' + authors);
  });

  pat.save( (err) => {
    if (err) return console.error(err);

    console.log('save successful!');
  });


  const str = 'Welcome to author page!';
  res.send(str);
});

module.exports = router;
