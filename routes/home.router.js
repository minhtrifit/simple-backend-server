var express = require("express");
var router = express.Router();
const HomeController = require("../controller/home.controller.js");

router.get("/", HomeController.getConnectServer);
router.get("/tasks", HomeController.getAllTasks);
router.post("/create", HomeController.createNewTask); // Require from client: name
router.post("/delete", HomeController.deleteTask); // Require from client: id
router.post("/edit", HomeController.editTask); // Require from client: id, name
router.post("/complete", HomeController.completeTask); // Require from client: id

// NOTE: Request from client to server must be: object type

module.exports = router;
