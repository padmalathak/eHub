const knex = require("knex")(require("../knexfile"));
const axios = require("axios");
const bcrypt = require("bcryptjs");

// -----------------GET---------------
// Get Users
const getUsers = async (req, res) => {
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const sortOrder = req.query.sortOrder;

  try {
    let query = knex("users");
    if (sortQuery) {
      query = query.orderBy(sortQuery, sortOrder);
    }
    if (searchQuery) {
      query = query
        .where("firstName", "like", `%${searchQuery}%`)
        .orWhere("lastName", "like", `%${searchQuery}%`)
        .orWhere("email", "like", `%${searchQuery}%`)
        .orWhere("status", "like", `%${searchQuery}%`)
        .orWhere("role", "like", `%${searchQuery}%`);
    }

    const users = await query;

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};
// Get User By ID
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await knex("users").where({ id }).first();
    if (!user) {
      res.status(404).json({ message: "User Not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user" });
  }
};
// Get Random Users
const getRandomUsers = async (_req, res) => {
  try {
    const response = await axios.get(
      "https://my.api.mockaroo.com/users?count=10",
      {
        headers: {
          "X-API-Key": "639fdfa0",
        },
      }
    );

    await knex("users").insert(response.data);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Put User by ID
// PUT /users/:id
const putUserById = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    jobTitle,
    department,
    city,
    state,
    country,
    phone,
    role,
    status,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !jobTitle ||
    !department ||
    !city ||
    !state ||
    !country ||
    !phone ||
    !role ||
    !status
  ) {
    return res
      .status(400)
      .json({ message: "Missing details, Please enter all the details" });
  }

  const reqBody = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    jobTitle: jobTitle,
    department: department,
    city: city,
    state: state,
    country: country,
    phone: phone,
    role: role,
    status: status,
  };

  const rowUpdated = await knex("users")
    .where({ id: req.params.id })
    .update(reqBody);

  if (!rowUpdated) {
    return res.status(404).json({
      message: `User with ID ${req.params.id} not found`,
    });
  }

  const newRecord = await knex("users")
    .select(
      "firstName",
      "lastName",
      "email",
      "jobTitle",
      "department",
      "city",
      "state",
      "country",
      "phone",
      "role",
      "status"
    )
    .where({ id: req.params.id })
    .first();
  res.json(newRecord);
};

// Delete User by ID
const deleteUserById = async (req, res) => {
  const deletedRows = await knex("users").where({ id: req.params.id }).delete();
  if (deletedRows === 0) {
    return res.status(404).json({
      message: `UserId ${req.params.id} not found`,
    });
  }
  res.sendStatus(204);
};

// Add new user, POST /user with reqbody
const addNewUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    jobTitle,
    department,
    city,
    state,
    country,
    phone,
    role,
    status,
    source,
    password,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !jobTitle ||
    !department ||
    !city ||
    !state ||
    !country ||
    !phone ||
    !role ||
    !status ||
    !source ||
    !password
  ) {
    console.log("Adding new User");
    return res
      .status(400)
      .json({ message: "Missing details, Please enter all the details" });
  }
  const salt = bcrypt.genSaltSync(4);
  const reqBody = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    jobTitle: jobTitle,
    department: department,
    city: city,
    state: state,
    country: country,
    phone: phone,
    role: role,
    status: status,
    source: source,
    password: bcrypt.hashSync(password, salt),
    salt: salt,
  };
  try {
    const response = await knex("users").insert(reqBody);
    const newUser = await knex
      .select(
        "id",
        "firstName",
        "lastName",
        "email",
        "jobTitle",
        "department",
        "city",
        "state",
        "country",
        "phone",
        "role",
        "status",
        "source"
      )
      .from("users")
      .where({ id: response[0] })
      .first();
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add user",
    });
  }
};

// --------Roles Count---------
// Get count of field
const getRoleCount = async (req, res) => {
  const roles = ["user", "super_admin", "read_only_admin"];
  try {
    const count = await knex
      .select("role", knex.raw("COUNT(*) as count_of_role"))
      .from("users")
      .whereIn("role", roles)
      .groupBy("role");

    res.json(count);
  } catch (error) {
    res.status(500).json({
      message: "Cannot get count of users",
    });
  }
};
// -----------Get Roles List-------
const getRoleDetails = async (req, res) => {
  const role = req.query.role;
  const roleList = await knex("users").where({ role: `${role}` });
  res.json(roleList);
};
// prettier-ignore
// Get random users from Okta
const getOktaRandomUsers = async (req, res) => {
  const { OktaURL, APIToken } = req.body;
  try {
    const response = await axios.get(`${OktaURL}/api/v1/users`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `SSWS ${APIToken}`,
      },
    });

    const profiles = response.data.map(obj=>{
      let status = obj.status;
      let profile = obj.profile;

      profile.jobTitle=profile.title;
      profile.source= "OKTA";
      profile.status=status;

      delete profile.login;
      delete profile.mobilePhone;
      delete profile.secondEmail;
      delete profile.title;

      return profile;

    })

    await knex("users").insert(profiles);
  
    res.json(profiles);
    
  } catch (error) {
    res.status(500).json({
      error : error
    })
    
  }

};

module.exports = {
  addNewUser,
  getRandomUsers,
  getOktaRandomUsers,
  getUsers,
  getUserById,
  putUserById,
  deleteUserById,
  getRoleCount,
  getRoleDetails,
};
