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
      console.log('Got toArray');
      console.log(docs);
      if (err) {
        console.log('In err');
        console.log(err);
        //callback(err);
      } else {
        console.log('err was falsy');

        console.log('cursor.toArray() returned:' + docs.length);
        var idAndStateArray = docs.reduce(function (previousValue, currentValue, index, array) {
          //console.log(currentValue);

          if (currentValue) {
            var currentObjectId = new ObjectId(currentValue._id);
            var idAndState = {
              '_id': currentObjectId,
              'State': currentValue.State
            };
            var oldIdAndState = previousValue[previousValue.length - 1];
            if (previousValue.length === 0 || oldIdAndState.State !== idAndState.State) {
              previousValue.push(idAndState);
            }
          }
          console.log(index);
          //$or: idMap
          if (index === array.length - 1) {
            console.log('IDMAP!');
            console.log(idAndStateArray);
          }
          return previousValue;
        }, []);

      }

      //.update({"_id" :ObjectId("4e93037bbf6f1dd3a0a9541a") },{$set : {"new_field":1}})

    });
  db.close();


});



//cursor.toArray().reduce(function (previousValue, currentValue) {
//  console.log(currentValue);
//  return previousValue.push(currentValue._id);
//}, []);