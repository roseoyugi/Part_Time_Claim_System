const express = require("express");
const db = require("./models");
const cors = require("cors");

const createAccountRouter = require("./routes/CreateAccount");
const loginRouter = require("./routes/Login");
const submitClaimRouter = require("./routes/SubmitClaim");
const claimsRouter = require("./routes/Claims");
const usersRouter = require("./routes/Users");
const departmentsRouter = require("./routes/Departments");
const jobsRouter = require("./routes/Jobs");
const uploadsRoute = require("./routes/Uploads");

const app = express();

app.use(express.json());
app.use(cors());

// Routers
app.use("/create-account", createAccountRouter);
app.use("/login", loginRouter);
app.use("/submit-claim", submitClaimRouter);
app.use("/uploads", uploadsRoute);
app.use("/claims", claimsRouter);
app.use("/users", usersRouter);
app.use("/departments", departmentsRouter);
app.use("/jobs", jobsRouter);
//...

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("--- Server running at port 8000 ---");
  });
});
