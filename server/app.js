import cookieParser from "cookie-parser";
import express from "express";
import employeeRoute from "./routes/employee.route.js";
import errorHandler from "./handlers/error.handler.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://taskclient-z1y8.onrender.com/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/employees", employeeRoute);

app.use((req, res, next) => {
  try {
    return res
      .status(400)
      .json({ success: false, message: "Opps! page not found" });
  } catch (error) {
    return next(error);
  }
});

app.use(errorHandler);
export default app;
