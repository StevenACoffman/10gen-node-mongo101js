# Read Preferences

- Notes:

You can choose the read order (Primary, Secondary or Nearest) in case of
failover or because you want that order.

# Replica Set Internals

Notes:

rs1: Primary -> use local -> show collections -> db.oplog.rs.find().pretty() (We can see the changes)
ps -ef | grep mongo -> kill

# Building a Sharded Environment

- Notes:
You need a index in the collection to start working with sharding.

# Implications of Sharding on development

- Notes:
Things to remember:
. Every doc includes the sharded key
. shard key is immutable
. you need a index that stand will the shard key (student_id). Not multikey index
. when you do an update you have to specify the shardkey or use multi = true. If you use multi without the  shardkey, then it sends the update to all the shards
. No use shard key in a operations, implies scather gather (send to all shard nodes)
. you cant have a unique key - unless if part of the shard key.

# Sharding + Replication

- Notes:
Take into account the write concern behavior in a sharded enviroment. If we use j, w (majority) or wtimeout, etc.

# Write Concert

Notes:
w (write concern)
w : 1 (number of mongo replica)
w : 2 or 3
w : "j" (if we crash we can recover the data based on the journal (j)
w : majority ...
