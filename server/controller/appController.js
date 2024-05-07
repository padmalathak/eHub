const knex = require("knex")(require("../knexfile"));
const qs = require("qs");
const axios = require("axios");

// Get the list of apps for userID
const getApps = async (req, res) => {
  const user_id = req.userObj.id;
  try {
    const apps = await knex("app").where("user_id", user_id);
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving apps" });
  }
};

// Get the list of all unique apps and their count
// GET /apps/list for Admiin only access
const getAppsList = async (_req, res) => {
  try {
    const appList = await knex("app")
      .select("app_name")
      .count("* as count")
      .groupBy("app_name");
    res.json(appList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving apps" });
  }
};

// Get App Users - returns the object which has list of users for that app
// Get app/users for Admin Only access
const getAppUsers = async (req, res) => {
  const app = req.query.app_name;
  const filterApp = req.query.filter;

  if (!app && !filterApp) {
    return res.status(400).send("No query parameters provided");
  }
  try {
    if (app) {
      const appUsers = await knex
        .select(
          "users.id",
          "users.firstName",
          "users.lastName",
          "users.email",
          "users.jobTitle",
          "users.department",
          "users.city",
          "users.state",
          "users.country",
          "users.phone",
          "users.role",
          "users.status"
        )
        .from("users")
        .join("app", "users.id", "app.user_id")
        .where({ "app.app_name": app })
        .andWhere("users.status", "active");

      if (appUsers.length === 0) {
        return res.status(404).send({
          message: "User with that app is not found",
        });
      }
      res.json(appUsers);
    } else if (filterApp) {
      const appUsers = await knex
        .select(
          "users.id",
          "users.firstName",
          "users.lastName",
          "users.email",
          "users.jobTitle",
          "users.department",
          "users.city",
          "users.state",
          "users.country",
          "users.phone",
          "users.role",
          "users.status"
        )
        .from("users")
        .whereNotExists(function () {
          this.select("user_id")
            .from("app")
            .whereRaw("app.user_id = users.id")
            .andWhere("app.app_name", "=", filterApp);
        })
        .andWhere("users.status", "active ");

      if (appUsers.length === 0) {
        return res.status(404).send({
          message: "User with that app is not found",
        });
      }
      res.json(appUsers);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("SOmething went wrong");
  }
};

// POST App/Users -Assigns Apps to Users
const postAppUsers = async (req, res) => {
  const { selectedRows, appName } = req.body;
  let appURL = "";

  if (typeof selectedRows === "undefined" || typeof appName === "undefined") {
    return res.status(400).send({
      message: "No request Body",
    });
  }
  if (appName === "slack") {
    appURL = "https://slack.com/";
  } else if (appName.toLowerCase() === "zoom") {
    appURL = "https://zoom.us/";
  } else if (appName.toLowerCase() === "salesforce") {
    appURL = "https://www.salesforce.com/";
  } else if (appName.toLowerCase() === "office365") {
    appURL = "https://www.office.com/";
  }
  selectedRows.forEach(async (id) => {
    knex("app")
      .insert({
        user_id: id,
        app_name: appName,
        app_link: appURL,
      })
      .then(console.log(`Inserted value for ID: ${id}`));
    if (appName.toLowerCase() === "office365") {
      const postData = {
        client_id: process.env.APP_ID,
        scope: "https://graph.microsoft.com/.default",
        client_secret: process.env.APP_SECRET,
        grant_type: "client_credentials",
      };
      console.log(qs.stringify(postData));
      axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";
      axios
        .post(
          "https://login.microsoftonline.com/8364578c-896d-4357-bdcd-7cff8d69e3a8/oauth2/v2.0/token",
          qs.stringify(postData)
        )
        .then(async (response) => {
          const record = await knex
            .select("firstName", "lastName", "email")
            .from("users")
            .where({ id: id })
            .first();
          const reqBody = {
            accountEnabled: true,
            displayName: `${record.firstName} ${record.lastName}`,
            mailNickname: `${record.firstName}`,
            userPrincipalName: `${record.firstName}@cloudok.onmicrosoft.com`,
            passwordProfile: {
              forceChangePasswordNextSignIn: true,
              password: "xWwvJ]6NMw+bWH-d",
            },
          };
          try {
            const responseData = await axios.post(
              "https://graph.microsoft.com/v1.0/users",
              reqBody,
              {
                headers: {
                  Authorization: `Bearer ${response.data.access_token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            console.log(responseData.data, "After posting");
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  res.sendStatus(204);
};

module.exports = {
  getApps,
  getAppsList,
  getAppUsers,
  postAppUsers,
};
