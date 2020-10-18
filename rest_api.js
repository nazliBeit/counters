const express = require('express');
const app = express();

let counters = new Map();
app.get('/counters/',(req,res)=>{
  res.send(counters);
});

app.listen('3000');
