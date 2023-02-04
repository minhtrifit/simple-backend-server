const { type } = require("os");
const { off } = require("process");
const db = require("../model/db.model.js");

function isExistId(id, list) {
  list.map((task) => {
    return task.id === id;
  });
  return false;
}

class HomeController {
  getConnectServer = async (req, res, next) => {
    try {
      res.status(200).json({
        message: "Server run successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTasks = async (req, res, next) => {
    try {
      const taskList = await db.getAllTasks();
      res.status(200).json({
        message: "success",
        data: taskList,
      });
    } catch (error) {
      next(error);
    }
  };

  createNewTask = async (req, res, next) => {
    try {
      // Get data from client
      const name = req.body.name;
      const taskList = await db.getAllTasks();
      const max = 9999;
      const min = 1000;
      let id;
      let success = false;

      // Create unique id
      do {
        id = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (isExistId(id, taskList));

      const task = {
        id: id,
        name: name,
        status: false,
      };

      // Insert task to database
      if (true) {
        await db.createNewTask(task);
        console.log(task);
        success = true;
      }

      // Check status
      if (success === true) {
        res.status(200).json({
          message: "success",
        });
      } else {
        res.status(404).json({
          message: "failed",
        });
      }
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req, res, next) => {
    try {
      const taskList = await db.getAllTasks();
      const id = parseInt(req.body.id);
      let success = false;

      // Find task from database and delete
      for (var i = 0; i < taskList.length; ++i) {
        if (taskList[i].id === id) {
          await db.deleteTask(taskList[i]);
          success = true;
        }
      }

      // Check status
      if (success === true) {
        res.status(200).json({
          message: "success",
        });
      } else {
        res.status(404).json({
          message: "failed",
        });
      }
    } catch (error) {
      next(error);
    }
  };

  editTask = async (req, res, next) => {
    try {
      const { id, name } = req.body;
      const taskList = await db.getAllTasks();
      let taskEdit;
      let success = false;

      for (var i = 0; i < taskList.length; ++i) {
        if (taskList[i].id == parseInt(id)) {
          console.log("Before:", taskList[i]);
          taskEdit = taskList[i];
          taskEdit.name = name;
        }
      }

      console.log("After:", taskEdit);

      if (true) {
        await db.editTask(taskEdit);
        success = true;
      }

      // Check status
      if (success === true) {
        res.status(200).json({
          message: "success",
        });
      } else {
        res.status(404).json({
          message: "failed",
        });
      }
    } catch (error) {
      next(error);
    }
  };

  completeTask = async (req, res, next) => {
    try {
      const taskList = await db.getAllTasks();
      const id = parseInt(req.body.id);
      let success = false;

      const targetTask = taskList.find((task) => {
        return task.id === id;
      });

      targetTask.status = !targetTask.status;

      if (true) {
        await db.completeTask(targetTask);
        success = true;
        console.log(targetTask);
      }

      // Check status
      if (success === true) {
        res.status(200).json({
          message: "success",
        });
      } else {
        res.status(404).json({
          message: "failed",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new HomeController();
