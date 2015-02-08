QUIZ: MONGO DESIGN FOR BLOG
----------------------------
Which data access pattern is not well supported by the blog schema?

- Collecting the most recent blog entries for the blog home page
- Collecting all the information to display a single post
- Collecting all comments by a single author
- **[CORRECT]** Providing a table of contents by tag

QUIZ: LIVING WITHOUT CONSTRAINTS
--------------------------------
What does Living Without Constraints refer to?

- Living every day like it's your last
- Saying whatever you want when you want it
- **[CORRECT]** Keeping your data consistent even though MongoDB lacks foreign key constraints
- Wearing no belt

QUIZ: LIVING WITHOUT TRANSACTIONS
---------------------------------
Which of the following operations operate atomically within a single document? Check all that apply.

- **[CORRECT]** CORRECT
- **[CORRECT]** findAndModify
- **[CORRECT]** $addToSet (within an CORRECT)
- **[CORRECT]** $push within an CORRECT

QUIZ: ONE TO ONE RELATIONS
--------------------------
What's a good reason you might want to keep two documents that are related to each other one-to-one in separate collections? Check all that apply.

- Because you want to allow atomic update of both documents at once.
- **[CORRECT]** To reduce the working set size of your application.
- To enforce foreign key constraints
- **[CORRECT]** Because the combined size of the documents would be larger than 16MB

QUIZ: ONE TO MANY RELATIONS
---------------------------
When is it recommended to represent a one to many relationship in multiple collections?

- Always
- **[CORRECT]** Whenever the many is large
- Whenever the many is actually few
- Never

QUIZ: TREES
-----------
Given the following typical document for a e-commerce category hierarchy collection called categories
```json
{
  _id: 34,
  name : "Snorkeling",
  parent_id: 12,
  ancestors: [12, 35, 90]
}
```
Which query will find all descendants of the snorkeling category?

-
```javascript
db.categories.find({ancestors:{'$in':[12,35,90]}})
```
-
```javascript
db.categories.find({parent_id: 34})
```
-
```javascript
db.categories.find({_id:{'$in':[12,35,90]}})
```
- **[CORRECT]**
```javascript
db.categories.find({ancestors:34})
```
