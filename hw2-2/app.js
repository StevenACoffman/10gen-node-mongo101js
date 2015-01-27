var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
	if(err) throw err;

	var data = db.collection('data');

	var cursor = data.find({});
	cursor.sort([['State',1], ['Temperature', -1]]);

	var state = "";
	cursor.each(function(err, doc){

		if(err) throw err;
		if(doc == null){
			db.close();
		} else {

			if(doc.State != state){
				doc.month_high = true;
				data.save(doc, function(err, saved){
					if(err) throw err;
			                console.dir("Successfully saved " + saved + " document!");
				});
				state = doc.State;
				console.dir(doc);


			}
		}



	});
});
