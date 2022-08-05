const fs = require("fs");

const operation = (type)=>
({
    increment:(count) => count+1,
    decrement:(count) => count-1,
    double:(count) => count+2
})[type]


const count = require("./data/count.json");

//set up api express
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { request } = require("https");
const { response } = require("express");
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//contacts api
const port = 3030;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
})
app.get("/",(request,response)=>{
   
   response.status(200).json(count);
})
app.get("/counter",(request,response)=>{
    console.log('count before',count);
    let name = "counter";
    if(request.query.name){
        name = request.query.name;

    }
  console.log('count after',count);
    response.status(200).json({[name]:count[name]});
 })
app.delete("/",(request,response)=>{
    count.counter = 0;
    response.status(201).json({})
});
app.post("/:operator",(request,response)=>{
    const{operator} = request.params;
    const mycount = operation(operator);
    const currentCount = mycount(count.counter);
    response.status(201).json({counter:currentCount});
 })
 app.put("/counter",(request,response)=>{
    if(request.query.value){
        count.counter = Number(request.query.value);
       }
       response.status(201).json(count);
 })