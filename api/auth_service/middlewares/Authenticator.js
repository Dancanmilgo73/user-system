require("dotenv").config();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

async function Authenticator(req, res, next){
    try {
      const authHeader= req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    console.log(token);
    if(token == null) return res.status(401).send({message: "Please use a token for access"});
    // JWT.verify(token, process.env.ACCESS_TOKEN, (err, {email, password, user})=>{
    //   if(err) return res.sendStatus(403);
    //    req.body.email = email;
    //  console.log(req.body)
    const result = await JWT.verify(token, process.env.SECRET_KEY)
    req.body.user = result
    // console.log("hapa:", result)
      // console.log(email, password, user);
      next();
    // })
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  }


  module.exports ={Authenticator}