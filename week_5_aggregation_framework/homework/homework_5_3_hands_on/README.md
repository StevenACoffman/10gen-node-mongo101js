# Homework 5.3

Who's the easiest grader on campus?
A set of grades are loaded into the grades collection.

The documents look like this:
```json
{
	"_id" : ObjectId("50b59cd75bed76f46522c392"),
	"student_id" : 10,
	"class_id" : 5,
	"scores" : [
		{
			"type" : "exam",
			"score" : 69.17634380939022
		},
		{
			"type" : "quiz",
			"score" : 61.20182926719762
		},
		{
			"type" : "homework",
			"score" : 73.3293624199466
		},
		{
			"type" : "homework",
			"score" : 15.206314042622903
		},
		{
			"type" : "homework",
			"score" : 36.75297723087603
		},
		{
			"type" : "homework",
			"score" : 64.42913107330241
		}
	]
}
```

There are documents for each student (student_id) across a variety of classes (class_id). Note that not all students in the same class have the same exact number of assessments. Some students have three homework assignments, etc.

Your task is to calculate the class with the best average student performance. This involves calculating an average for each student in each class of all non-quiz assessments and then averaging those numbers to get a class average. To be clear, each student's average includes only exams and homework grades. Don't include their quiz scores in the calculation.

What is the class_id which has the highest average student perfomance?

Hint/Strategy: You need to group twice to solve this problem. You must figure out the GPA that each student has achieved in a class and then average those numbers to get a class average. After that, you just need to sort. The class with the lowest average is the class with class_id=2. Those students achieved a class average of 37.6

If you prefer, you may download the handout and perform your analysis on your machine with
```
 mongoimport -d test -c grades --drop grades.json
```
Below, choose the class_id with the highest average student average.

# Answer:
- 8
- 9
- **(OK)** 1
- 5
- 7
- 0
- 6
# Web Shell:
```javascript
db.grades.aggregate([{
			$unwind: '$scores'
		}, {
			$match: {
				'scores.type': {
					$in: [
						'exam',
						'homework'
					]
				}
			}
		}, {
			$group: {
				'_id': {
					'class_id': '$class_id',
					'student_id': '$student_id'
				},
				avg_student: {
					'$avg': '$scores.score'
				}
			}
		}, {
			$group: {
				'_id': '$_id.class_id',
				avg_class: {
					'$avg': '$avg_student'
				}
			}
		}, {
			$sort: {
				'avg_class': -1
			}
		}, {
			$project: {
				_id: 0,
				'class_id': '$_id',
				avg_class: 1
			}
		}, {
			$limit: 1
		}])
```

# Manual Program version

```
mongoimport -d hw53 -c grades --drop < grades/grades.json
npm install
node app.js
```
