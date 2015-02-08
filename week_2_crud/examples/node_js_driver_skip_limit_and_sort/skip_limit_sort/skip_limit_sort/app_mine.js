'use strict';
var MongoClient = require('mongodb').MongoClient,
  ObjectId = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/weather', function (err, db) {
  if (err) {
    throw err;
  }

  var grades = db.collection('data');

  var cursor = grades.find({
    '_id': new ObjectId('54bdb1ee67b9fc9c9c31646b')
  });
  //cursor.skip(1);
  //cursor.limit(4);
  //cursor.sort('grade', 1);
  //cursor.sort([['grade', 1], ['student', -1]]);

  //var options = { 'skip' : 1,
  //                'limit' : 4,
  //                'sort' : [['grade', 1], ['student', -1]] };
  //var cursor = grades.find({}, {}, options);

  cursor.each(function (err, doc) {
    if (err) {
      throw err;
    }
    if (doc == null) {
      return db.close();
    }
    console.dir(doc);
  });
});