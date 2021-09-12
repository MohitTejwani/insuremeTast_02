In this task I have use multi-tenent architecture to  run multiple mongoDB database parallel

Instruction to  run  project 
1: npm install 
2: please  create .env file  and copy  all  variables from env.example  file 
3: npm start  OR  node server.js

API  Route : 
Post   http://127.0.0.1:5000/v1
    this  api  for store message in first database 

   example of  body
   {
    "message":"Hello",
    "sheduleDateTime":"2022-09-12T16:37:50.281+00:00"
    } 

