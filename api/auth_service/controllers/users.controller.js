require("dotenv").config();
const mssql = require('mssql')
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { sqlConfig } = require("../db/config");


const registerUser = async(req,res) =>{
    function checkPasswordStrength(password) {
      const checkForLength = new RegExp("^(?=.{8,})");
      const checkForSymbols = new RegExp("^(?=.*[!@#$%^&*])");
      const checkForCapsLettersNumbers = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"
      );
      if (!checkForLength.test(password))
         res.status(401).send({message: "Password must be atleast 8 characters long "});
  
      if (!checkForSymbols.test(password))
         res.status(401).send({message: "Password must contain atleast 1 symbol"});
  
      if (!checkForCapsLettersNumbers.test(password))
       res
          .status(401)
          .send({message: "Password must contain small, letters caps and numbers"});
    }
     
    try {
      const { email, username, password, confirmPassword } = req.body;
      if (!email || !username || !password || !confirmPassword)
         return res.status(401).send({message: "fill in all credentials"});
  
      if (password !== confirmPassword)
         return res.status(401).send({message: "Confirm password do not match"});
        checkPasswordStrength(password);
      const hashedPassword = await bcrypt.hash(password, 10).catch(err=> console.log(err));
      const user = { email, name: username, password: hashedPassword };
      console.log(user);
      const pool = await mssql.connect(sqlConfig)
     const result = await pool.request().input('username', mssql.VarChar,user.name)
      .input('email', mssql.VarChar, user.email)
      .input('password', mssql.VarChar, user.password)
      .execute('dbo.spUsers_AddUser')
    //   .catch(err=> res.status(401).send({message: "email already in use"}));
    return res.status(201).send({message: "User was added"});
  
  
  
    
      } catch (err) {
         return res.status(500).send({message: err.message});
      }
  
  
      
  }

  const loginUser = async(req,res) => {
    const { email, password } = req.body;
    try {
        
        if (email && password) {
     
        const pool = await mssql.connect(sqlConfig);
        const data = await pool.request().input('email', mssql.VarChar,email).execute('dbo.spUsers_LoginUser');
        const user = data.recordset[0];
        if (!user) res.status(401).send({message: "User not found"});
             bcrypt.compare(password, user.password, (err, result) => {
                if(err) return res.status(401).send({message: err.message});
              if (!result) return res.status(401).send({message: "Wrong credentials"});
      
              const token = JWT.sign(
                { user: user.username, password: user.password, email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
              );
              return res.json({ accessToken: token });
            });
        
      };
         
    
    
        
    } catch (error) {
       
        return res.status(500).send({message: erroe.message})
    }
} 


const updateUser = async(req,res)=>{
    try {
        const {user, newPassword} = req.body
    } catch (error) {
        return res.status(500).send({message: erroe.message})
    }
}
  module.exports = {registerUser, loginUser, updateUser}