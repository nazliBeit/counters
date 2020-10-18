const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let counters = new Map();
app.use(bodyParser.json());

app.get('/counters/',(req,res)=>{
  res.send(counters);
});

app.post('/counters',(req,res)=>{
  for (const [key, value] of Object.entries(req.body)) {
    counters[key] = value;
  }
  res.send(counters);
});

app.listen('3000');
