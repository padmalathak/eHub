const express = require("express");
const cors = require("cors");
const userRouter = require("./router/users-routes");
const loginRouter = require("./router/login-routes");
const appRouter = require("./router/app-routes");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const port = process.env.PORT || 8080;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/apps", appRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
