const TodoTask = require("./models/TodoTask");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose"); // DB_CONNECT

dotenv.config();

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

//------ Connection to mongoDB

mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
  app.listen(3000, () => console.log("Server up and running"));
});

// View engine configuration
app.set("view engine", "ejs");

// GET
app.get("/", (req, res) => {
  TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
  });
});

// POST
app.post("/", async (req, res) => {
  const todoTask = new TodoTask({
    content: req.body.content
  });

  try {
    await todoTask.save();
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
});
