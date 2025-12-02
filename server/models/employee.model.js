import mongoose from "mongoose";

const EmployeeSchemna = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Minimum name length 2 characters"],
      maxLength: [50, "Maximun name length 50 characters "],
    },
    department: {
      type: String,
      toLowerCase: true,
      required: [true, "Department is required"],
      minLength: [2, "Minimum Department length 2 characters"],
      maxLength: [50, "Maximun Department length 50 characters "],
    },

    joiningDate: {
      type: Date,
      default: Date.now,
      validate: {
        validator: function (value) {
          return value <= Date.now();
        },
        message: "Date can't in future",
      },
    },

    role: {
      type: String,
      required: [true, "Role is required"],
      minLength: [2, "Minimum Role length 2 characters"],
      maxLength: [50, "Maximun Role length 50 characters "],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female"],
        message: `Gender must be Male or Female`,
      },
    },

    status: {
      type: String,
      default: "Active",
      enum: {
        values: ["Active", "Archive"],
        message: "Status must be Active or Archive",
      },
    },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model("Employee", EmployeeSchemna);

export default EmployeeModel;
