# HOMEWORK: HOMEWORK 5.4

Removing Rural Residents
In this problem you will calculate the number of people who live in a zip code in the US where the city starts with a digit. We will take that to mean they don't really live in a city. Once again, you will be using the zip code collection, which you will find in the 'handouts' link in this page. Import it into your mongod using the following command from the command line:
```
mongoimport -d test -c zips --drop zips.json
```
If you imported it correctly, you can go to the test database in the mongo shell and conform that
```javascript
db.zips.count()
````

yields 29,467 documents.

The project operator can extract the first digit from any field. For example, to extract the first digit from the city field, you could write this query:
```javascript
db.zips.aggregate([
    {$project:
     {
	first_char: {$substr : ["$city",0,1]},
     }
   }
])
```
Using the aggregation framework, calculate the sum total of people who are living in a zip code where the city starts with a digit. Choose the answer below.

Note that you will need to probably change your projection to send more info through than just that first character. Also, you will need a filtering step to get rid of all documents where the city does not start with a digital (0-9).

# Answer:
- (OK) 298015
- 345232
- 245987
- 158249
- 543282
- 312893

# Manual Answer:
```javascript
db.zips.aggregate([
      /* Using projection */
      //{$project: {_id:1, first_char: {$substr : ["$city",0,1]}, pop:1 }},
      //{$match: {'first_char': {$in: ['0','1','2','3','4','5','6','7','8','9']} }},
      /* Using regex */
      {
        $match: {
          'city': {
            $regex: '^[0-9]'
          }
        }
      },
      /* Result */
      {
        $group: {
          '_id': null,
          population: {
            $sum: '$pop'
          }
        }
      }, {
        $project: {
          _id: 0,
          'population': 1
        }
      }
    ]);
```
# Manual Program version
```
mongoimport -d test -c zips --drop zips.json
npm install
node app.js
```
