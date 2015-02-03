QUIZ: INDEXES
-------------

Which optimization will typically have the greatest impact on the
performance of a database.

-   Adding more memory so that the working set fits in memory.
-   Adding a faster drive so that operations that hit disk will happen
    more quickly.
-   Replacing your CPU with a faster one (say one 2x as fast)
-   **[Answer]** Adding appropriate indexes on large collections so that
    only a small percentage of queries need to scan the collection.

QUIZ: CREATING INDEXES
----------------------

Please provide the mongo shell command to add an index to a collection
named students, having the index key be class, student\_name.

-   **[Answer]** db.students.ensureIndex( { class: 1, student\_name: 1 }
    )

QUIZ: MULTIKEY INDEXES
----------------------

Suppose we have a collection foo that has an index created as follows:

> db.foo.ensureIndex({a:1, b:1})

Which of the following inserts are valid to this collection?

-   **[Answer]** db.foo.insert({a:["apples","oranges"], b:"grapes"})
-   **[Answer]** db.foo.insert({a:"grapes", b:"oranges"})
-   **[Answer]** db.foo.insert({a:"grapes", b:[8,9,10]})
-   db.foo.insert({a:[1,2,3], b:[5,6,7]})

QUIZ: INDEX CREATION OPTION, UNIQUE
-----------------------------------

Please provide the mongo shell command to add a unique index to the
collection students on the keys student\_id, class\_id.

-   **[Answer]** db.students.ensureIndex({student\_id: 1, class\_id: 1},
    {unique: true})

QUIZ: INDEX CREATION, REMOVING DUPS
-----------------------------------

If you choose the dropDups option when creating a unique index, what
will the MongoDB do to documents that conflict with an existing index
entry?

-   Move them to an archive collection.
-   Unset the conflicting key so that they can be indexed and remain in
    the collection.
-   Remove them but write the deleted documents in JSON to a special
    file in the log directory.
-   **[Answer]** Delete them for ever and ever, Amen.

QUIZ: INDEX CREATION, SPARSE
----------------------------

Suppose you had the following documents in a collection called people
with the following docs:

> db.people.find()

``` {.json}
    { "_id" : ObjectId("50a464fb0a9dfcc4f19d6271"), "name" : "Andrew", "title" : "Jester" }
    { "_id" : ObjectId("50a4650c0a9dfcc4f19d6272"), "name" : "Dwight", "title" : "CEO" }
    { "_id" : ObjectId("50a465280a9dfcc4f19d6273"), "name" : "John" }
```

And there is an index defined as follows:

> db.people.ensureIndex( { title : 1 } , { sparse : 1 } )

If you perform the following query, what do you get back, and why?

> db.people.find( { title : null } ).hint( {title : 1 } )

-   **[Answer]** No documents, because the query uses the index and
    there are no documents with title:null in the index.
-   No documents, because querying for title:null only finds documents
    that explicitly have title:null, regardless of the index.
-   The document for John, because the query won't use the index.
-   All the documents in the collection, because title:null matches all
    documents.
-   The document for John, because the ensureIndex command won't succeed
    in this case.

QUIZ: INDEX CREATION, BACKGROUND
--------------------------------

    Which things are true about creating an index in the background in MongoDB. Check all that apply.

-   **[Answer]** A mongod instance can only build one background index
    at a time per database.
-   **[Answer]** Although the database server will continue to take
    requests, a background index creation still blocks the mongo shell
    that you are using to create the index.
-   **[Answer]** Creating an index in the background takes longer than
    creating it in the foreground
-   In Mongo 2.2 and above, indexes are created in the background by
    default.

QUIZ: USING EXPLAIN
-------------------

Given the following output from explain, what is the best description of
what happened during the query?

``` {.json}
{
  "cursor" : "BasicCursor",
  "isMultiKey" : false,
  "n" : 100000,
  "nscannedObjects" : 10000000,
  "nscanned" : 10000000,
  "nscannedObjectsAllPlans" : 10000000,
  "nscannedAllPlans" : 10000000,
  "scanAndOrder" : false,
  "indexOnly" : false,
  "nYields" : 7,
  "nChunkSkips" : 0,
  "millis" : 5151,
  "indexBounds" : {

  },
  "server" : "Andrews-iMac.local:27017"
}
```

-   The query used an index called BasicCursor and returned in a 5151
    microseconds
-   **[Answer]** The query scanned 10,000,000 documents, returning
    100,000 in 5.2 seconds.
-   The query scanned 100,000 documents and return in 5 milliseconds.
-   The query was able to use a covered index to answer the query
    entirely within the index without looking at the documents.

ANSWER

The answer is that the query scanned 10 million documents, returning in
about 5.2 seconds. You can see 10 million documents right there in the
'nScannedObjects' field. By objects it means JSON objects (a.k.a.
documents). You can also see the 100,000 documents returned in the 'n'
field.

This what happens to our large student collection of grades when we
don't hit an index. So it was a query that returned 100,000 documents
and had a look at every single document to do it, and that's why it took
over five seconds.

QUIZ: WHEN IS AN INDEX USED?
----------------------------

Given collection foo with the following index:

> db.foo.ensureIndex({a:1, b:1, c:1})

Which of the following queries will use the index?

-

``` {.javascript}
db.foo.find({b:3, c:4})
```

-   **[Answer]**

``` {.javascript}
db.foo.find({a:3})
```

-   **[Answer]**

``` {.javascript}
db.foo.find({c:1}).sort({a:1, b:1})
```

-

``` {.javascript}
db.foo.find({c:1}).sort({a:-1, b:1})
```

QUIZ: HOW LARGE IS YOUR INDEX?
------------------------------

Is it more important that your index or your data fit into memory?

-   **[Answer]** Index
-   Data

QUIZ: INDEX CARDINALITY
-----------------------

Let's say you update a document with a key called tags and that update
causes the document to need to get moved on disk. If the document has
100 tags in it, and if the tags array is indexed with a multikey index,
how many index points need to be updated in the index to accomodate the
move? Put just the number below.

-   **[Answer]** 100

QUIZ: INDEX SELECTIVITY
-----------------------

Given the following attributes of automobiles: color, weight,
manufacturer, odometer mileage, which index is likely be the most
selective, provided you can provide all four attributes on a search:

-   Color
-   Weight
-   Manufacturer
-   **[Answer]** Odometer Mileage

QUIZ: HINTING AN INDEX
----------------------

Given the following documents in the people collection:

``` {.javascript}
> db.people.find()
```

``` {.json}
{ "_id" : ObjectId("50a464fb0a9dfcc4f19d6271"), "name" : "Andrew", "title" : "Jester" }
{ "_id" : ObjectId("50a4650c0a9dfcc4f19d6272"), "name" : "Dwight", "title" : "CEO" }
{ "_id" : ObjectId("50a465280a9dfcc4f19d6273"), "name" : "John" }
```

and the following indexex:

``` {.javascript}
> db.people.getIndexes()
```

``` {.json}
[
  {
    "v" : 1,
    "key" : {
      "_id" : 1
    },
    "ns" : "test.people",
    "name" : "_id_"
  },
  {
    "v" : 1,
    "key" : {
      "title" : 1
    },
    "ns" : "test.people",
    "name" : "title_1",
    "sparse" : 1
  }
]
```

Which queries below will return all three documents? Check all that
apply.

-   **[ANSWER]**

    ``` {.javascript}
    db.people.find().sort({'title':1}).hint({$natural:1})
    ```

-   **[ANSWER]**

    ``` {.javascript}
    db.people.find().sort({'title':1})
    ```

-   **[ANSWER]**

    ``` {.javascript}
    db.people.find({name:{$ne:"Kevin"}}).sort({'title':1})
    ```

-   ``` {.javascript}
    db.people.find({'title':{$ne:null}}).hint({'title':1})
    ```

ANSWER

In MongoDB 2.6, all of these will work except for the last one, the
reason being that forcing it to use the index means that it's using an
index without an entry for documents without a 'title' field.

Prior to mongoDB 2.6, only the option that hinted { \$natural : 1 }
worked, as it would use a sparse index by default unless told not to.

QUIZ: GEOSPATIAL INDEXES
------------------------

Suppose you have a 2D geospatial index defined on the key location in
the collection places. Write a query that will find the closest three
places (the closest three documents) to the location 74, 140.

-   **[ANSWER]**

    ``` {.javascript}
    db.places.find( { location : { $near : [74,140] } }).limit(3)
    ```

QUIZ: GEOSPATIAL SPHERICAL
--------------------------

What is the query that will query a collection named "stores" to return
the stores that are within 1,000,000 meters of the location latitude=39,
longitude=-130? Type the query in the box below. Assume the stores
collection has a 2dsphere index on "loc" and please use the "\$near"
operator. Each store record looks like this:

``` {.json}
{ "_id" : { "$oid" : "535471aaf28b4d8ee1e1c86f" }, "store_id" : 8, "loc" : { "type" : "Point", "coordinates" : [ -37.47891236119904, 4.488667018711567 ] } }
```

-   **[ANSWER]**

    ``` {.javascript}
    db.stores.find({ loc:{ $near:   { $geometry: { type: "Point", coordinates: [-130, 39]}, $maxDistance:1000000 } } })
    ```

QUIZ: TEXT SEARCHES IN MONGODB
------------------------------

You create a text index on the "title" field of the movies collection,
and then perform the following text search:

``` {.javascript}
db.movies.find( { $text : { $search : "Big Lebowski" } } )
```

Which of the following documents will be returned, assuming they are in
the movies collection? Check all that apply.

-   **[ANSWER]**

    ``` {.json}
    { "title" : "The Big Lebowski" , star: "Jeff Bridges" }
    ```

-   **[ANSWER]**

    ``` {.json}
    { "title" : "Big" , star : "Tom Hanks" }
    ```

-   **[ANSWER]**

    ``` {.json}
    { "title" : "Big Fish" , star: "Ewan McGregor" }
    ```

QUIZ: PROFILING
---------------

Write the query to look in the system profile collection for all queries
that took longer than one second, ordered by timestamp descending.

-   **[ANSWER]**

    ``` {.javascript}
    db.system.profile.find({millis:{$gt:1000}}).sort({ts:-1})
    ```
