#! /bin/bash

fuser -k 3000/tcp
fuser -k 5000/tcp

service redis redis_6379 start

cd ./oj-server
nodemon server.js &

cd ../executor
pip3 install -r requirements.txt
python3 executor_server.py &

echo "#########################"

read -p "PRESS [enter] to terminate process" PRESSKEY

fuser -k 3000/tcp
fuser -k 5000/tcp
service redis redis_6379 stop