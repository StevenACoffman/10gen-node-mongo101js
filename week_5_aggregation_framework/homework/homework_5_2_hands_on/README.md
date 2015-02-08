HOMEWORK: HOMEWORK 5.2 (HANDS ON)
---------------------------------

Crunching the Zipcode dataset
Please calculate the average population of cities in California (abbreviation CA) and New York (NY) (taken together) with populations over 25,000.

For this problem, assume that a city name that appears in more than one state represents two separate cities.

Please round the answer to a whole number.
Hint: The answer for CT and NJ (using this data set) is 38177.

Please note:
Different states might have the same city name.
A city might have multiple zip codes.


For purposes of keeping the Hands On shell quick, we have used a subset of the data you previously used in zips.json, not the full set. This is why there are only 200 documents (and 200 zip codes), and all of them are in New York, Connecticut, New Jersey, and California.

If you prefer, you may download the handout and perform your analysis on your machine with
> mongoimport -d test -c zips --drop small_zips.json

Once you've generated your aggregation query and found your answer, select it from the choices below.

# Answer:
- **[CORRECT]** 44805
- 55921
- 67935
- 71819
- 82426
- 93777

# Webshell command
```javascript
db.zips.aggregate([{
      $group: {
        '_id': {
          'state': '$state',
          'city': '$city'
        },
        pop: {
          $sum: '$pop'
        }
      }
    }, {
      $match: {
        '_id.state': {
          $in: [
            'CA',
            'NY'
          ]
        },
        'pop': {
          $gt: 25000
        }
      }
    }, {
      $group: {
        '_id': null,
        'average_pop': {
          '$avg': '$pop'
        }
      }
    }]);
```
# Manual program version
```
mongoimport -d test -c zips --drop small_zips/small_zips.json
npm install
node app.js
```
