require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");

const tokenVerify = async (req, res, next) => {
  const { authorization } = req.headers;


  if (!authorization) {
    return res.status(401).send("Unauthenticated");
  }
  const token = authorization.split(" ")[1];
  try {
    let payload = {};
    if(jwt.decode(token)['iss']==="https://accounts.google.com"){
       let email = jwt.decode(token)['email'];
        let userRole = await knex
        .select(["role","id"])
        .from("users")
        .where({ email: email })
        .first();
       payload = jwt.decode(token);
       payload['role']=userRole.role
       payload['id']=userRole['id']
    }
    else {
      
      payload = jwt.verify(token, process.env.SECRET_KEY);
    }
    
    req.userObj = payload;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid token");
  }
};

// Admin only
const adminOnly = (req, res, next) => {
  if (req.userObj.role !== "super_admin") {
    return res.status(403).send("No rights to access this");
  }
  next();
};

// User Only
const UserOnly = (req, res, next) => {
  if (req.userObj.role !== "user") {
    return res.status(403).send("No rights to access this");
  }
  next();
};

module.exports = {
  tokenVerify,
  adminOnly,
  UserOnly,
};
