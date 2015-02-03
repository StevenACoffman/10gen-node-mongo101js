'use strict';

var mongodb = require('mongodb'),
  db,
  col,
  cursorExhausted = false,
  updatesPending = 0;

function processStudent(err, doc) {
  if (err) {
    console.log('Cursor error');
    return;
  }
  if (doc == null) {
    cursorExhausted = true;
    return;
  }
  var lowestHomework;
  doc.scores.forEach(function (score) {
    if (score.type === 'homework' && (lowestHomework === null || lowestHomework.score > score.score)) {
      lowestHomework = score;
    }
  });
  if (lowestHomework) {
    col.update({
      '_id': doc._id
    }, {
      '$pull': {
        'scores': lowestHomework
      }
    }, function (err, updated) {
      updatesPending--;
      if (err) {
        console.log('Doc update error:' + err);
        return;
      }
      if (cursorExhausted && updatesPending === 0) {
        return db.close();
      }
    });
    updatesPending++;
  }

  function connect(err, database) {
    if (err) {
      console.log('Database error');
      return;
    }
    db = database;
    col = db.collection('students');
    col.find().each(processStudent);
  }

  mongodb.MongoClient.connect('mongodb://localhost:27017/school', connect);

}