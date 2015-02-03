Performance
-----------
1. Indexes are critical to performance
2. Explain
3. Hint
4. Profiling


Discovering Indexes
-------------------

-   db.system.indexes.find()
-   db.students.getIndexes()
-   db.students.dropIndex({'student\_id':1})

Creating Indexes
----------------
-   Create Sparse Index
    - db.collection.ensureIndex( { a: 1 }, { sparse: true } )
- Create a text index
    - db.sentences.ensureIndex({'words':'text'})

Efficiency of Index Use
-----------------------
$gt or $lt only use half the index
$ne do not use index
regex only if not using leftmost stem
