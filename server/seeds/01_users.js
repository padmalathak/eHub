/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const axios = require("axios");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("users").del();

  const response = await axios.get(
    "https://my.api.mockaroo.com/users?count=100",
    {
      headers: {
        "X-API-Key": "639fdfa0",
      },
    }
  );
  response
  await knex("users").insert(response.data);
};
