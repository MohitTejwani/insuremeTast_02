#!/usr/bin/bash
ps aux | grep node
kill -2 PID
node ./app.js