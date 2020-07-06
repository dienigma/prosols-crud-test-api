const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { Parser } = require('json2csv');
const fs = require('fs');

const app = express();

app.use(express.json());


let tasks = [];



// Get Tasks
app.get('/',(req,res) => {
  res.send(tasks)
})

// Create a task
app.post('/',(req,res) => {
  const {name, status} = req.body;
  tasks = [...tasks,{id: uuidv4(),name,status}] 
  res.send(tasks)
})

// Update a task
app.patch('/:taskId',(req,res) => {
  const {name, status} = req.body;
  tasks.map(item => {
    if(item.id === req.params.taskId){
      console.log(item);
      item.name = !name? item.name : name;
      item.status = !status ? item.status: status; 
    }
  })
    
  res.send(tasks);
})

// delete a task
app.delete('/:taskId',(req,res) => {
  tasks = tasks.filter(item => item.id !== req.params.taskId)
  res.send(tasks)
})

// extract json to csv
app.get('/getCSV',(req,res)=> {
  try {
    const data = tasks;
    const opts = {data};
    const parser = new Parser(opts);
    const csv = parser.parse(data);
    res.send(csv);
  } catch (err) {
    console.error(err);
  }
})

const port = process.env.PORT || 5000;

app.listen(port,()=> console.log(`Port listening on ${port}`))