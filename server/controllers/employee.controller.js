import EmployeeModel from "../models/employee.model.js";
import sendResponse from "../utils/sendResponse.js";

//Add employee
const addEmployee = async (req, res, next) => {
  try {
    const newEmployee = await EmployeeModel.create(req.body);
    return sendResponse(
      res,
      201,
      true,
      "Employee added successfully",
      newEmployee
    );
  } catch (error) {
    return next(error);
  }
};

//Get all employee
const getEmployees = async (req, res, next) => {
  try {
    const employees = await EmployeeModel.find();
    if (!employees) {
      return sendResponse(res, 500, false, "Employees not found");
    }

    return sendResponse(
      res,
      200,
      true,
      "Employee fetched successfully",
      employees
    );
  } catch (error) {
    return next(error);
  }
};
//Update employee
const updateEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Body", req.body);

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    console.log("Updated", updatedEmployee);

    if (!updatedEmployee) {
      return sendResponse(res, 400, false, "Employee not found");
    }
    return sendResponse(
      res,
      200,
      true,
      "Employee updated successfully",
      updatedEmployee
    );
  } catch (error) {
    return next(error);
  }
};

//Delete employee
const deleteEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return sendResponse(res, 400, false, "Employee not found");
    }
    return sendResponse(res, 200, true, "Employee deleted successfully");
  } catch (error) {
    return next(error);
  }
};

//Exporting controllers
const employeeController = {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
export default employeeController;
