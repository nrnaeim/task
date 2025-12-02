import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then((connect) => {
    console.log(
      `Database connected successfully to: ${connect.connection.host}`
    );
    app.listen(PORT, () => {
      console.log(`Server listening on port:${PORT}`);
    });
  })
  .catch((error) => {
    process.exit[1];
    console.log(error);
  });
