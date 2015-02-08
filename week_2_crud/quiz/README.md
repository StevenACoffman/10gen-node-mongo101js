QUIZ: CRUD AND THE MONGO SHELL
------------------------------
By the end of this week, you'll know which of the following?

- **[CORRECT]** MongoDB's basic document creation, retrieval, modification, and removal operations
- **[CORRECT]** Some features of the MongoDB shell, mongo
- How to measure performance of MongoDB operations
- **[CORRECT]** How to manipulate MongoDB documents from a language
- How to analyze data in MongoDB collections

QUIZ: SECRETS OF THE MONGO SHELL
--------------------------------
What does the following fragment of JavaScript output?
```javascript
x = { "a" : 1 };
y = "a";
x[y]++;
print(x.a);
```
- **[CORRECT]** 2

QUIZ: BSON INTRODUCED
---------------------
Which of the following are types available in BSON?

- **[CORRECT]** Strings
- **[CORRECT]** Floating-point numbers
- Complex numbers
- **[CORRECT]** Arrays
- **[CORRECT]** Objects (Subdocuments)
- **[CORRECT]** Timestamps

QUIZ: INSERTING DOCS
--------------------
Insert a document into the fruit collection with the attributes of "name" being "apple", "color" being "red", and "shape" being "round". Use the "insert" method.

This is a fully functional web shell, so please press enter for your query to get passed to the server, just like you would for the command line shell.

- **[CORRECT]**
```javascript
db.fruit.insert({'name':'apple','color':'red', 'shape':'round'})
```

QUIZ: INTRODUCTION TO FINDONE
-----------------------------
Use findOne on the collection users to find one document where the key username is "dwight", and retrieve only the key named email.
- **[CORRECT]**
```javascript
db.users.findOne({"username" : "dwight"}, {"email" : true, "_id" : false})
```

QUIZ: QUERYING USING FIELD SELECTION
------------------------------------
Supposing a scores collection similar to the one presented, how would you find all documents with type: essay and score: 50 and only retrieve the student field?
- **[CORRECT]**
```javascript
db.scores.find({"type" : "essay", "score":50}, {"student" : true, "_id" : false})
```

QUIZ: QUERYING USING $GT AND $LT

Which of these finds documents with a score between 50 and 60, inclusive?

-
```javascript
db.scores.find({ score : { $gt : 50 , $lt : 60 } } );
```
- **[CORRECT]**
```javascript
db.scores.find({ score : { $gte : 50 , $lte : 60 } } );
```
-
```javascript
db.scores.find({ score : { $gt : 50 , $lte : 60 } } );
```
-
```javascript
db.scores.find({ score : { $gte : 50 , $lt : 60 } } );
```
-
```javascript
db.scores.find({ score : { $gt : 50 } } );
```

QUIZ: INEQUALITIES ON STRINGS
-----------------------------
Which of the following will find all users with name between "F" and "Q" (Inclusive)?

- **[CORRECT]**
```javascript
db.users.find( { name : { $gte : "F" , $lte : "Q" } } );
```
- **[CORRECT]**
```javascript
db.users.find( { name : { $lte : "Q" , $gte : "F" } } );
```
-
```javascript
db.users.find( { name : { $gte : "f" , $lte : "Q" } } );
```
-
```javascript
db.users.find( { name : { $lte : "Q" } });
```

QUIZ: USING REGEXES, $EXISTS, $TYPE
-----------------------------------
Write a query that retrieves documents from a users collection where the name has a "q" in it, and the document has an email field.

- **[CORRECT]**
```javascript
db.users.find({ name : { $regex : "q" }, email : { $exists: true } } );
```

QUIZ: USING $OR
---------------
How would you find all documents in the scores collection where the score is less than 50 or greater than 90?

Note: We're afraid that the parser has trouble recognizing when you switch the order, so be sure to put your "less than" operator before your "greater than" one.

- **[CORRECT]**
```javascript
db.scores.find({$or : [{"score" : {$lt : 50}},{ "score" : {$gt : 90}}]});
```

QUIZ: USING $AND
-----------------
What will the following query do?
```javascript
db.scores.find( { score : { $gt : 50 }, score : { $lt : 60 } } );
```

- Find all documents with score between 50 and 60
- Find all documents with score greater than 50
- **[CORRECT]** Find all documents with score less than 60
- Explode like the Death Star
- None of the above

QUIZ: QUERYING INSIDE ARRAYS
----------------------------
Which of the following documents would be returned by this query?
```javascript
db.products.find( { tags : "shiny" } );
```

- **[CORRECT]**
```json
{ _id : 42 , name : "Whizzy Wiz-o-matic", tags : [ "awesome", "shiny" , "green" ] }
```
-
```json
{ _id : 704 , name : "Fooey Foo-o-tron", tags : [ "blue", "mediocre" ] }
```
- **[CORRECT]**
```json
{ _id : 1040 , name : "Snappy Snap-o-lux", tags : "shiny" }

-
```json
{ _id : 12345 , name : "Quuxinator", tags : [ ] }
```
QUIZ: USING $IN AND $ALL
------------------------
Which of the following documents matches this query?
```javascript
db.users.find( { friends : { $all : [ "Joe" , "Bob" ] }, favorites : { $in : [ "running" , "pickles" ] } } )
```

-
```json
{ name : "William" , friends : [ "Bob" , "Fred" ] , favorites : [ "hamburgers", "running" ] }
```
-
```json
{ name : "Stephen" , friends : [ "Joe" , "Pete" ] , favorites : [ "pickles", "swimming" ] }
```
- **[CORRECT]**
```json
{ name : "Cliff" , friends : [ "Pete" , "Joe" , "Tom" , "Bob" ] , favorites : [ "pickles", "cycling" ] }
```
-
```json
{ name : "Harry" , friends : [ "Joe" , "Bob" ] , favorites : [ "hot dogs", "swimming" ] }
```

QUIZ: QUERIES WITH DOT NOTATION
-------------------------------
Suppose a simple e-commerce product catalog called catalog with documents that look like this:
```json
{ product : "Super Duper-o-phonic",
  price : 100000000000,
  reviews : [ { user : "fred", comment : "Great!" , rating : 5 },
              { user : "tom" , comment : "I agree with Fred, somewhat!" , rating : 4 } ],
  ... }
```

Write a query that finds all products that cost more than 10,000 and that have a rating of 5 or better.

- **[CORRECT]**
```javascript
db.catalog.find({"price": {$gt : 10000},"reviews.rating" : {$gte : 5}});
```
QUIZ: QUERYING, CURSORS
-----------------------
Recall the documents in the scores collection:
```json
{
  "_id" : ObjectId("50844162cb4cf4564b4694f8"),
  "student" : 0,
  "type" : "exam",
  "score" : 75
}
```
Write a query that retrieves exam documents, sorted by score in descending order, skipping the first 50 and showing only the next 20.

- **[CORRECT]**
```javascript
db.scores.find({type: "exam"}).sort({"score": -1}).skip(50).limit(20);
```

QUIZ: COUNTING RESULTS
----------------------
How would you count the documents in the scores collection where the type was "essay" and the score was greater than 90?
- **[CORRECT]**
```javascript
db.scores.count({type: "essay", score : {$gt : 90}});
```

QUIZ: WHOLESALE UPDATING OF A DOCUMENT
----------------------------------------
Let's say you had a collection with the following document in it:
```json
{ "_id" : "Texas", "population" : 2500000, "land_locked" : 1 }
```
and you issued the query:
```javascript
db.foo.update({_id:"Texas"},{population:30000000})
```
What would be the state of the collection after the update?

```json
{ "_id" : "Texas", "population" : 2500000, "land_locked" : 1 }
```
-
```json
{ "_id" : "Texas", "population" : 3000000, "land_locked" : 1 }
```
- **[CORRECT]**
```json
{ "_id" : "Texas", "population" : 30000000 }
```
-
```json
{ "_id" : ObjectId("507b7c601eb13126c9e3dcca"), "population" : 2500000 }
```

QUIZ: USING THE $SET COMMAND
----------------------------
For the users collection, the documents are of the form
```json
{
  "_id" : "myrnarackham",
  "phone" : "301-512-7434",
  "country" : "US"
}
```
Please set myrnarackham's country code to "RU" but leave the rest of the document (and the rest of the collection) unchanged.

Hint: You should not need to pass the "phone" field to the update query.

This is a fully functional web shell, so please press enter for your query to get passed to the server, just like you would for the command line shell.

- **[CORRECT]**
```javascript
db.users.update({'_id':'myrnarackham'}, {'$set':{'country':'RU'}})
```

QUIZ: USING THE $UNSET COMMAND
------------------------------
Write an update query that will remove the "interests" field in the following document in the users collection.
```json
{
    "_id" : "jimmy" ,
    "favorite_color" : "blue" ,
    "interests" : [ "debating" , "politics" ]
}
```
Do not simply empty the array. Remove the key : value pair from the document.

- **[CORRECT]**
```javascript
db.users.update({'_id':'jimmy'}, {$unset: {interests:1}})
```

QUIZ: USING $PUSH, $POP, $PULL, $PUSHALL, $PULLALL, $ADDTOSET
-----------------------------------------------------------------
Suppose you have the following document in your friends collection:
```json
{ _id : "Mike", interests : [ "chess", "botany" ] }
```
What will the result of the following updates be?
```javascript
db.friends.update( { _id : "Mike" }, { $push : { interests : "skydiving" } } );
db.friends.update( { _id : "Mike" }, { $pop : { interests : -1 } } );
db.friends.update( { _id : "Mike" }, { $addToSet : { interests : "skydiving" } } );
db.friends.update( { _id : "Mike" }, { $pushAll: { interests : [ "skydiving" , "skiing" ] } } );
```
- **[CORRECT]**
```json
{
    "_id" : "Mike",
    "interests" : [
        "botany",
        "skydiving",
        "skydiving",
        "skiing"
    ]
}
```

QUIZ: UPSERTS
-------------
After performing the following update on an empty collection
```javascript
db.foo.update( { username : 'bar' }, { '$set' : { 'interests': [ 'cat' , 'dog' ] } } , { upsert : true } );
```
What could be a document in the collection?

-
```json
{ "_id" : ObjectId("507b78232e8dfde94c149949"), "interests" : [ "cat", "dog" ]}
```
-
```json
{"interests" : [ "cat", "dog" ], "username" : "bar" }
```
-
```json
{}
```
  - **[CORRECT]**
```json
{ "_id" : ObjectId("507b78232e8dfde94c149949"), "interests" : [ "cat", "dog" ], "username" : "bar" }
```

QUIZ: MULTI-UPDATE
------------------
Recall the schema of the scores collection:
```json
{
  "_id" : ObjectId("50844162cb4cf4564b4694f8"),
  "student" : 0,
  "type" : "exam",
  "score" : 75
}
```
Give every document with a score less than 70 an extra 20 points.

If you input an incorrect query, don't forget to reset the problem state, as any wrong update will likely take you away from your initial state.

- **[CORRECT]**
```javascript
db.scores.update({'score':{$lt:70}}, {$inc: {score:20}},{multi:true})
```

QUIZ: REMOVING DATA
-------------------
Recall the schema of the scores collection:
```json
{
  "_id" : ObjectId("50844162cb4cf4564b4694f8"),
  "student" : 0,
  "type" : "exam",
  "score" : 75
}
```
Delete every document with a score of less than 60.

This is a fully functional web shell, so please press enter for your query to get passed to the server, just like you would for the command line shell.
- **[CORRECT]**
```javascript
db.scores.remove({score:{$lt:60}})
```
QUIZ: NODE.JS DRIVER: FIND, FINDONE, AND CURSORS
------------------------------------------------
```javasscript
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db)
{
     if(err) throw err;

     var query = { 'grade' : 100};

     function callback(err, doc) {
          if(err) throw err;

          console.dir(doc);

          db.close();
     }
     /* TODO */
});
```
- **[CORRECT]**
```javascript
db.collection('grades').findOne(query, callback);
```

QUIZ: NODE.JS DRIVER: USING FIELD PROJECTION
--------------------------------------------
Which of the following queries will cause only the 'grade' field to be returned?

-
```javascript
db.collection('grades').find({'grade':0,"_id":1}, callback);
```
-
```javascript
db.collection('grades').find({'grade':1,"_id":0}, callback);
```
- **[CORRECT]**
```javascript
db.collection('grades').find({}, {'grade':1, '_id':0}, callback);
```
-
```javascript
db.collection('grades').find({}, {'grade':1}, callback);
```
