| Stage    | Operation | Type               |
|----------|-----------|--------------------|
| $project | reshape   | 1:1 transformation |
| $match   | filter    | n:1 transformation |
| $group   | aggregate | n:1 transformation |
| $sort    | sort      | 1:1 transformation |
| $skip    | skip      | n:1 transformation |
| $limit   | limit     | n:1 transformation |
| $unwind  | normalize | 1:n transformation |
| $out     | output    | 1:1 transformation |


- $redact security filter
- $geonear location filter


SQL Terms, Functions, and Concepts	MongoDB Aggregation Operators
-----------------------------------------------------------------

|  WHERE 	 | $match   |
|----------|----------|
| GROUP BY | $group   |
| HAVING   | $match   |
| SELECT   | $project |
| ORDER BY | $sort    |
| LIMIT	   | $limit   |
| SUM()    | $sum     |
| COUNT()	 | $sum     |

-  join	- No direct corresponding operator; however, the $unwind operator allows for somewhat similar functionality, but with fields embedded within the document.
