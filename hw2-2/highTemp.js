/*jshint -W106*/
'use strict';
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function (err, db) {
  if (err) {
    throw err;
  }

  db.collection('data')
    .find({})
    .sort([
      ['State', 1],
      ['Temperature', -1]
    ])
    .toArray(function (err, docs) {
      var state = '';
      var month_highs = [];
      for (var i = 0; i < docs.length; i++) {
        //We are transitioning to a new state
        if (state !== docs[i].State) {
          month_highs.push(docs[i]);
        }
        state = docs[i].State;
      }
      var numCallbacks = 0;
      for (i = 0; i < month_highs.length; i++) {
        db.collection('data').update(month_highs[i], {
            '$set': {
              'month_high': true
            }
          },
          function (err, updated) {
            if (err) {
              throw err;
            }
            console.log('Updated: ' + updated + 'document month high');
            if (++numCallbacks === month_highs.length) {
              return db.close();
            }
          });
      }
    });
});