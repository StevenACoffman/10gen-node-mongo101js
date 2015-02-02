'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


MongoClient.connect('mongodb://localhost:27017/school', function (error, db) {
  if (error) {
    throw error;
  }

  var cursor = db.collection('students').find();
  cursor.each(function (error, doc) {
    if (error) {
      console.err(error);
      throw error;
    } else {
      if (doc == null) {
        console.log('program execution is complete');
        setTimeout(function () {
          console.log('Shutting down...');
          db.close();
        }, 500);

      } else {
        var lowestGradeIndex = 0;
        var lowestGrade = 10000;
        var studentGrades = doc.scores;
        var numberOfGrades = studentGrades.length;
        for (var i = 0; i < numberOfGrades; i++) {
          if (studentGrades[i].type === 'homework' && studentGrades[i].score < lowestGrade) {
            lowestGrade = studentGrades[i].score;
            lowestGradeIndex = i;
            console.log('===============NEW LOWEST==============');
            console.log(doc);
            console.log('=============================');
          }
        }
        //delete 1 item at lowestGradeIndex
        studentGrades.splice(lowestGradeIndex, 1);

        var query = {
          '_id': doc._id
        };
        doc.scores = studentGrades;

        db.collection('students').update(query, doc, function (error, saved) {
          if (error) {
            throw error;
          } else {
            console.dir('Successfully saved ' + saved + ' document!');
          }
        });

      }
    }

  });

});