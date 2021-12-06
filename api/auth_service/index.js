
require("dotenv").config();
const express = require('express')
const app = express()
const port = 3001
const user = require('./routes/users.routes')
const mssql = require('mssql')

const cors = require('cors');
const { sqlConfig } = require('./db/config');




app.use(cors())
app.use(express.json());

mssql.connect(sqlConfig).then(pool =>{
  if(pool.connected){
  console.log("Connected")}}
);

app.use('/user', user);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})