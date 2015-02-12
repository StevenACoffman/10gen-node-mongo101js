#!/bin/bash
echo "Shutting down MongoDB instances"

mongod=mongod
grep_mongo=$(ps aux | grep -v grep | grep "${mongod}")
if [ ${#grep_mongo} -gt 0 ]
  then
    for PID in $(ps x | grep -v grep | grep "${mongod}" | awk '{ print $1 }')
    do
      kill -2 "${PID}"
      echo "Shutdown mongo process ID ${PID} result $? (0 = Success)"
    done
else
  echo "MongoDB is not running."
fi
echo "Deleting data"
rm -r -f data
echo "Deleting log files"
rm -f ./*.log.*
rm -f ./*.log
echo "All done."
