/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("app").del();
  await knex("app").insert([
    {
      id: 1,
      user_id: 21,
      app_name: "slack",
      app_link: "https://slack.com/",
      app_img:
        "https://cdn.bfldr.com/5H442O3W/at/pl546j-7le8zk-btwjnu/Slack_RGB.png?auto=webp&format=png",
    },
    {
      id: 2,
      user_id: 21,
      app_name: "salesforce",
      app_link: "https://www.salesforce.com/",
      app_img:
        "https://www.salesforce.com/news/wp-content/uploads/sites/3/2020/08/SFDO-Logo-2020-RGB-Vert-FullColor.png?w=1024&h=552",
    },
    {
      id: 3,
      user_id: 21,
      app_name: "Office365",
      app_link: "https://www.office.com/",
      app_img:
        "https://365cloudstore.com/wp-content/uploads/2023/02/m365-new-500x500-01.png",
    },
    {
      id: 4,
      user_id: 21,
      app_name: "Zoom",
      app_link: "https://zoom.us/",
      app_img: "https://1000logos.net/wp-content/uploads/2021/06/Zoom-Logo.png",
    },
  ]);
};
