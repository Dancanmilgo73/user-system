require("dotenv").config();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const mssql = require('mssql')

const Authenticator = async(req, res, next)=>{
    try {
      const authHeader= req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    console.log("t",token);
    if(token == null) return res.status(401).send({message: "Please use a token for access"});
      const result = await JWT.verify(token, process.env.SECRET_KEY)
      console.log("user,<: ",result);
    req.body.user = result
      next();
    // })
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  }

  const isAdmin = async(req, res, next) => {
    try {
    if(req.body.user.roleId !== 1) return res.status(401).send({message: "Only admins can make this request"})
      next()
    } catch (error) {
      res.status(500).send({message: error.message})
    }
  }


  module.exports ={Authenticator, isAdmin}