const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//List of counters in a map/dictionary format
let counters = new Map();

// convert map to object to send as a response body
function map_to_object(map) {
  const out = Object.create(null);
  map.forEach((value, key) => {
      out[key] = value;
  })
  return out;
}

app.use(bodyParser.json());

app.get('/counters/',(req,res)=>{
  res.send(map_to_object(counters));
});

app.post('/counters',(req,res)=>{
  for (const [key, value] of Object.entries(req.body)) {
    counters.set(key, value);
  }
  res.send(map_to_object(counters));
});

app.put('/counters/:counter',(req, res)=>{
  let counter_name = req.params.counter;
  if (! counters.has(counter_name)) {
    res.status(404).send();
    return;
  }
  counters.set(counter_name,  counters.get(counter_name)+1);
  res.send(map_to_object(counters));
});

app.delete('/counters/:counter',(req, res)=>{
  let counter_name = req.params.counter;
  if (! counters.has(counter_name)) {
    res.status(404).send();
    return;
  }
  counters.set(counter_name,  counters.get(counter_name)-1);
  if (counters.get(counter_name) <= 0) counters.delete(counter_name);
  res.send(map_to_object(counters));
});

app.get('/counters/:counter',(req,res)=>{
  let counter_name = req.params.counter;
  if (! counters.has(counter_name)) {
    res.status(404).send();
    return;
  }
  res.send(counters.get(counter_name).toString());
});

app.listen('3000');
