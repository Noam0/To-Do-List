import express from "express";


const app = express();
const port = 3000;

let numOfTasks = 0;
let tasks = [];

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



function validateTaskData(req, res, next) {
    const { Text, Deadline } = req.body;
  
    if (!Text || !Deadline) {
      res.locals.errorMessage = 'Both "Text" and "Deadline" are required.';
      return res.render("index.ejs", {
        tasks: tasks,
      });
    }
  
    next();
  }

app.get("/", (req, res) => {
  res.render("index.ejs", {tasks: tasks});
});

app.post("/submit", validateTaskData, (req, res) => {
    const text = req.body["Text"];
    const deadline = req.body["Deadline"];
    const id = numOfTasks++;
    const task = { text, deadline,id};
    tasks.push(task);
    res.render("index.ejs", {
      tasks: tasks,
    });
    console.log(tasks);
  });



  app.post("/delete", (req, res) => {
    const taskId = req.body.Text;
    console.log(taskId);
  
    // Convert taskId to a number
    const taskIdAsNumber = parseInt(taskId, 10);
  
    // Find the index of the task with the given id
    const taskIndex = tasks.findIndex(task => task.id === taskIdAsNumber);
  
    if (taskIndex !== -1) {
      // Remove the task from the array
      tasks.splice(taskIndex, 1);
    }
  
    res.redirect("/");
  });



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});