/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("firstName");
    table.string("lastName");
    table.string("email");
    table.string("jobTitle");
    table.string("department");
    table.string("city");
    table.string("state");
    table.string("country");
    table.string("phone");
    table.string("status");
    table.string("password");
    table.string("salt");
    table.string("role");
    table.string("source");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
