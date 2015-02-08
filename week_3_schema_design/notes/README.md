Goals of Normalization
----------------------
- Free the database of modification anomalies
- Minimize redesign when extending
- Avoid Bias toward any particular access pattern

Mongo does not care about the last one. Optimizing toward common (or critical) access patterns is better than being equally bad at all access patterns.

Living without transactions
---------------------------
ACID (Atomicity, Consistency, Isolation, Durability) is a set of properties that guarantee that database transactions are processed reliably.

MongoDB is ACID compliant at the document level, but not over multiple documents.

-Atomic: it either fully completes or it does not
-Consistent: no reader will see a "partially applied" update
-Isolated: again, no reader will see a "dirty" read
-Durable: (with the appropriate write concern)

What MongoDB doesn't have is transactions -- that is, multiple-document updates that can be rolled back and are ACID-compliant.

How to deal with lack of transactions:
1. Restructure the DB Design such that important things are in one JSON Document itself
2. Implement software such that find and update operations consistently…
3. Tolerate little bit of inconsistencies..



Benefits of Embedding Data
--------------------------
- Improved Read performance
- One Round Trip to the DB

When to Denormalize
-------------------

| Relationship | Denormalize? |
|--------------|-------|
| 1:1          | Embed |
| 1:Many       | Embed (from the many to the one) |
| Many: 1      | Link (May cause duplication) |
| Many: Many   | Link |
