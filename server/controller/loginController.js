const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Password validate
const login = async (req, res) => {
  console.log("Entering Login");
  const { email, password } = req.body;

  try {
    const { salt } = await knex
      .select("salt")
      .from("users")
      .where({ email: email })
      .first();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const response = await knex
      .select("password")
      .from("users")
      .where({ email: email })
      .first();

    const userData = await knex
      .select("*")
      .from("users")
      .where({ email: email })
      .first();

    if (response.password) {
      const result = response;
      if (!result) {
        // not found!
        // report invalid username
        return res.status(400).json({ message: "Bad Username" });
      }
      var pass = result.password;
      if (hashedPassword === pass) {
        // login
        const token = await jwt.sign(
          {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
          },
          process.env.SECRET_KEY
        );
        res.cookie("token", token, {
          expires: new Date(Date.now() + 999999),
          httpOnly: true,
        });
        res.status(200).json({
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Bad Credentials" });
        // failed login
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
};
