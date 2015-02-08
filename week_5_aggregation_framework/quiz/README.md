QUIZ: SIMPLE AGGREGATION EXAMPLE
--------------------------------

Write the aggregation query that will find the number of products by
category of a collection that has the form:

``` {.json}
{
  "_id" : ObjectId("50b1aa983b3d0043b51b2c52"),
  "name" : "Nexus 7",
  "category" : "Tablets",
  "manufacturer" : "Google",
  "price" : 199
}
```

Have the resulting key be called "num\_products," as in the video
lesson. Hint, you just need to change which key you are aggregating on
relative to the examples shown in the lesson. Please double quote all
keys to make it easier to check your result.

``` {.javascript}
db.products.aggregate([{
  $group: {
    "_id": "$category",
    "num_products": {
      $sum: 1
    }
  }
}])
```

QUIZ: THE AGGREGATION PIPELINE
------------------------------

Which of the following are stages in the aggregation pipeline. Check all
that apply.

-   **[CORRECT]** Match
-   Transpose
-   **[CORRECT]** Group
-   **[CORRECT]** Skip
-   **[CORRECT]** Limit
-   **[CORRECT]** Sort
-   **[CORRECT]** Project
-   **[CORRECT]** Unwind

QUIZ: SIMPLE EXAMPLE EXPANDED
-----------------------------
If you have the following collection of stuff:
```javascript
db.stuff.find()
```
```json
{ "_id" : ObjectId("50b26f9d80a78af03b5163c8"), "a" : 1, "b" : 1, "c" : 1 }
```
```json
{ "_id" : ObjectId("50b26fb480a78af03b5163c9"), "a" : 2, "b" : 2, "c" : 1 }
```
```json
{ "_id" : ObjectId("50b26fbf80a78af03b5163ca"), "a" : 3, "b" : 3, "c" : 1 }
```
```json
{ "_id" : ObjectId("50b26fcd80a78af03b5163cb"), "a" : 3, "b" : 3, "c" : 2 }
```
```json
{ "_id" : ObjectId("50b26fd380a78af03b5163cc"), "a" : 3, "b" : 5, "c" : 3 }
```
and you perform the following aggregation:
```javascript
db.stuff.aggregate([{$group:{_id:'$c'}}])
```
How many documents will be in the result set from aggregate?

- 1
- 2
- **[CORRECT]**3
- 4
- 5


QUIZ: COMPOUND GROUPING
-----------------------

Given the following collection:
```javascript
db.stuff.find()
```
```json
{ "_id" : ObjectId("50b26f9d80a78af03b5163c8"), "a" : 1, "b" : 1, "c" : 1 }
```
```json
{ "_id" : ObjectId("50b26fb480a78af03b5163c9"), "a" : 2, "b" : 2, "c" : 1 }
```
```json
{ "_id" : ObjectId("50b26fbf80a78af03b5163ca"), "a" : 3, "b" : 3, "c" : 1 }
```
```json
{ "_id" : ObjectId("50b26fcd80a78af03b5163cb"), "a" : 3, "b" : 3, "c" : 2 }
```
```json
{ "_id" : ObjectId("50b26fd380a78af03b5163cc"), "a" : 3, "b" : 5, "c" : 3 }
```
```json
{ "_id" : ObjectId("50b27f7080a78af03b5163cd"), "a" : 3, "b" : 3, "c" : 2 }
```

And the following aggregation query:
```javascript
db.stuff.aggregate([{$group:
         {_id:
          {'moe':'$a',
           'larry':'$b',
           'curly':'$c'
          }
         }
        }])
```
How many documents will be in the result set?

- 2
- 3
- 4
- **[CORRECT]**5
- 6

QUIZ: AGGREGATION EXPRESSIONS
-----------------------------
Which of the following aggregation expressions must be used in conjunction with a sort to make any sense?

- \$addToSet
- **[CORRECT]**\$first
- **[CORRECT]**\$last
- \$max
- \$min
- \$avg
- \$push
- \$sum

QUIZ: USING $SUM
----------------
This problem, and some after it, use the zips collection from media.mongodb.org/zips.json. You don't need to download it, but you can if you want, allowing you to test your queries within MongoDB. You can import, once downloaded, using mongoimport

Suppose we have a collection of populations by postal code. The postal codes in are in the _id field, and are therefore unique. Documents look like this:

```json
{
  "city" : "CLANTON",
  "loc" : [
    -86.642472,
    32.835532
  ],
  "pop" : 13990,
  "state" : "AL",
  "_id" : "35045"
}
```
For students outside the United States, there are 50 non-overlapping states in the US with two letter abbreviations such as NY and CA. In addition, the capital of Washington is within an area designated the District of Columbia, and carries the abbreviation DC. For purposes of the mail, the postal service considers DC to be a "state." So in this dataset, there are 51 states. We call postal codes "zip codes." A city may overlap several zip codes.

Write an aggregation query to sum up the population (pop) by state and put the result in a field called population. Don't use a compound _id key (you don't need one and the quiz checker is not expecting one). The collection name is zips. so something along the lines of db.zips.aggregate...

- **[CORRECT]**
```javascript
db.zips.aggregate([{
  "$group": {
    "_id": "$state",
    "population": {
      $sum: "$pop"
    }
  }
}])
```

QUIZ: USING $AVG
----------------
Hands on: This problem uses a subset of the same data as we referenced in the $sum quiz, but only a subset, so the answers you get in this web shell will be different than those you would find using the full data set. They also won't correspond to the actual averages of the populations in the zip codes of those states.

Given population data by zip code (postal code), write an aggregation expression to calculate the average population of a zip code (postal code) by state. This dataset only contains four states, and only 50 zip codes per state, because some browsers have trouble working with large data sets.


Which of the following represents the average populations that you find?

This is a web shell problem, so please interact with the web shell as you would with a shell in a terminal window on your computer. Hit enter after each command. You will not need (or be able to) change databases, and will be working with the zips collection.

-
```json
{ "NY": 13226.48, "NJ": 16949.9, "CT": 9705.34, "CA": 19067.72 }
```
-
```json
{ "NY": 16949.9, "NJ": 9705.34, "CT": 13226.48, "CA": 19067.72 }
```
- **[CORRECT]**
```json
{ "NY": 9705.34, "NJ": 16949.9, "CT": 13226.48, "CA": 19067.72 }
```
-
```json
{ "NY": 19067.72, "NJ": 16949.9, "CT": 13226.48, "CA": 9705.34 }
```
-
```json
{ "NY": 10000.34, "NJ": 16949.9, "CT": 13226.48, "CA": 19067.72 }
```

QUIZ: USING $ADDTOSET
---------------------
This problem uses the same zip code data as the $using sum quiz. See that quiz for a longer explanation.
Suppose we population by zip code (postal code) data that looks like this (putting in a query for the zip codes in Palo Alto)

```javascript
db.zips.find({state:"CA",city:"PALO ALTO"})
```

```json
{ "city" : "PALO ALTO", "loc" : [ -122.149685, 37.444324 ], "pop" : 15965, "state" : "CA", "_id" : "94301" }
```
```json
{ "city" : "PALO ALTO", "loc" : [ -122.184234, 37.433424 ], "pop" : 1835, "state" : "CA", "_id" : "94304" }
```
```json
{ "city" : "PALO ALTO", "loc" : [ -122.127375, 37.418009 ], "pop" : 24309, "state" : "CA", "_id" : "94306" }
```

Write an aggregation query that will return the postal codes that cover each city. The results should look like this:

```javascript
    {
      "_id" : "CENTREVILLE",
      "postal_codes" : [
        "22020",
        "49032",
        "39631",
        "21617",
        "35042"
      ]
    },
```

Again the collection will be called zips. You can deduce what your result column names should be from the above output. (ignore the issue that a city may have the same name in two different states and is in fact two different cities in that case - for eg Springfield, MO and Springfield, MA)

```javascript
db.zips.aggregate([{
  "$group": {
    "_id": "$city",
    "postal_codes": {
      "$addToSet": "$_id"
    }
  }
}])
```

QUIZ: USING $PUSH
-----------------

Given the zipcode dataset (explained more fully in the using $sum quiz) that has documents that look like this:
```javascript
db.zips.findOne()
```
```json
{
  "city" : "ACMAR",
  "loc" : [
    -86.51557,
    33.584132
  ],
  "pop" : 6055,
  "state" : "AL",
  "_id" : "35004"
}
```
would you expect the following two queries to produce the same result or different results?
```javascript
db.zips.aggregate([{
  "$group": {
    "_id": "$city",
    "postal_codes": {
      "$push": "$_id"
    }
  }
}])```
```javascript
db.zips.aggregate([{
  "$group": {
    "_id": "$city",
    "postal_codes": {
      "$addToSet": "$_id"
    }
  }
}])```

- **[CORRECT]** Same result
- Different Result


QUIZ: USING $MAX AND $MIN
-------------------------

Again thinking about the zip code database, write an aggregation query that will return the population of the postal code in each state with the highest population. It should return output that looks like this:
```json
{
      "_id" : "WI",
      "pop" : 57187
    },
    {
      "_id" : "WV",
      "pop" : 70185
    },
```
..and so on
Once again, the collection is named zips.
- **[CORRECT]**
```javascript
db.zips.aggregate([{
  $group: {
    "_id": "$state",
    pop: {
      $max: "$pop"
    }
  }
}])
```
QUIZ: DOUBLE $GROUP STAGES
---------------------------
Given the following collection:
```javascript
db.fun.find()
```

Results:
```json
{ "_id" : 0, "a" : 0, "b" : 0, "c" : 21 }
```
```json
{ "_id" : 1, "a" : 0, "b" : 0, "c" : 54 }
```
```json
{ "_id" : 2, "a" : 0, "b" : 1, "c" : 52 }
```
```json
{ "_id" : 3, "a" : 0, "b" : 1, "c" : 17 }
```
```json
{ "_id" : 4, "a" : 1, "b" : 0, "c" : 22 }
```
```json
{ "_id" : 5, "a" : 1, "b" : 0, "c" : 5 }
```
```json
{ "_id" : 6, "a" : 1, "b" : 1, "c" : 87 }
```
```json
{ "_id" : 7, "a" : 1, "b" : 1, "c" : 97 }
```
And the following aggregation query:

```javascript
db.fun.aggregate([{
  $group: {
    _id: {
      a: "$a",
      b: "$b"
    },
    c: {
      $max: "$c"
    }
  }
}, {
  $group: {
    _id: "$_id.a",
    c: {
      $min: "$c"
    }
  }
}])
```
What values are returned?

- 17 and 54
- 97 and 21
- 54 and 5
- **[CORRECT]** 52 and 22

QUIZ: USING $PROJECT
--------------------
Write an aggregation query with a single projection stage that will transform the documents in the zips collection from this:
```json
{
  "city" : "ACMAR",
  "loc" : [
    -86.51557,
    33.584132
  ],
  "pop" : 6055,
  "state" : "AL",
  "_id" : "35004"
}
```
to documents in the result set that look like this:
```json
{
  "city" : "acmar",
  "pop" : 6055,
  "state" : "AL",
  "zip" : "35004"
}
```
So that the checker works properly, please specify what you want to do with the _id key as the first item. The other items should be ordered as above. As before, assume the collection is called zips. You are running only the projection part of the pipeline for this quiz.

A few facts not mentioned in the lesson that you will need to know to get this right: If you don't mention a key, it is not included, except for _id, which must be explicitly suppressed. If you want to include a key exactly as it is named in the source document, you just write key:1, where key is the name of the key. You will probably get more out of this quiz is you download the zips.json file and practice in the shell. zips.json link is in the using $sum quiz

- **[CORRECT]**
```javascript
db.zips.aggregate([{
  $project: {
    _id: 0,
    city: {
      $toLower: "$city"
    },
    pop: 1,
    state: 1,
    zip: "$_id"
  }
}])
```

QUIZ: USING $MATCH
------------------
Again, thinking about the zipcode collection, write an aggregation query with a single match phase that filters for zipcodes with greater than 100,000 people. You may need to look up the use of the $gt operator in the MongoDB docs.

Assume the collection is called zips.
```javascript
db.zips.aggregate([{
  $match: {
    pop: {
      $gt: 100000
    }
  }
}])
```

QUIZ: USING $SORT
-----------------
Again, considering the zipcode collection, which has documents that look like this,
```json
{
  "city" : "ACMAR",
  "loc" : [
    -86.51557,
    33.584132
  ],
  "pop" : 6055,
  "state" : "AL",
  "_id" : "35004"
}
```

Write an aggregation query with just a sort stage to sort by (state, city), both ascending. Assume the collection is called zips.

- **[CORRECT]**
```javascript
db.zips.aggregate([{
  $sort: {
    state: 1,
    city: 1
  }
}])
```

QUIZ: USING $LIMIT AND $SKIP
----------------------------
Suppose you change the order of skip and limit in the query shown in the lesson, to look like this:
```javascript
db.zips.aggregate([
    {$match:
     {
   state:"NY"
     }
    },
    {$group:
     {
   _id: "$city",
   population: {$sum:"$pop"},
     }
    },
    {$project:
     {
   _id: 0,
   city: "$_id",
   population: 1,
     }
    },
    {$sort:
     {
   population:-1
     }
    },
    {$limit: 5},
    {$skip: 10}
])
```

How many documents do you think will be in the result set?

- 10
- 5
- **[CORRECT]** 0
- 100

QUIZ: REVISITING $FIRST AND $LAST
---------------------------------
Given the following collection:
```javascript
db.fun.find()
```
Results:
```json
{ "_id" : 0, "a" : 0, "b" : 0, "c" : 21 }
```
```json
{ "_id" : 1, "a" : 0, "b" : 0, "c" : 54 }
```
```json
{ "_id" : 2, "a" : 0, "b" : 1, "c" : 52 }
```
```json
{ "_id" : 3, "a" : 0, "b" : 1, "c" : 17 }
```
```json
{ "_id" : 4, "a" : 1, "b" : 0, "c" : 22 }
```
```json
{ "_id" : 5, "a" : 1, "b" : 0, "c" : 5 }
```
```json
{ "_id" : 6, "a" : 1, "b" : 1, "c" : 87 }
```
```json
{ "_id" : 7, "a" : 1, "b" : 1, "c" : 97 }
```

What would be the value of c in the result from this aggregation query

```javascript
db.fun.aggregate([
    {$match:{a:0}},
    {$sort:{c:-1}},
    {$group:{_id:"$a", c:{$first:"$c"}}}
])
```

- 21
- **[CORRECT]** 54
- 97
- 5

QUIZ: USING $UNWIND
-------------------

Suppose you have the following collection:

```javascript
db.people.find()
```
```json
{ "_id" : "Barack Obama", "likes" : [ "social justice", "health care", "taxes" ] }
```
```json
{ "_id" : "Mitt Romney", "likes" : [ "a balanced budget", "corporations", "binders full of women" ] }
```

And you unwind the "likes" array of each document. How many documents will you wind up with?

- 2
- 4
- **[CORRECT]** 6
- 9

QUIZ: $UNWIND EXAMPLE
---------------------
Which grouping operator will enable to you to reverse the effects of an unwind?

- $sum
- $addToSet
- **[CORRECT]** $push
- $first

QUIZ: DOUBLE $UNWIND
--------------------
Can you reverse the effects of a double unwind (2 unwinds in a row) in our inventory collection (shown in the lesson ) with the $push operator?

- **[CORRECT]** Yes
- No
