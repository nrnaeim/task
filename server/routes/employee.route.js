import express from "express";
import employeeController from "../controllers/employee.controller.js";

const employeeRoute = express.Router();

//Get all employee route
employeeRoute.get("/", employeeController.getEmployees);
//Add employee route
employeeRoute.post("/add", employeeController.addEmployee);
//Update employee route
employeeRoute.put("/update/:id", employeeController.updateEmployee);
//Delete employee route
employeeRoute.delete("/delete/:id", employeeController.deleteEmployee);

export default employeeRoute;
