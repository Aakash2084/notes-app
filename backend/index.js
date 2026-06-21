const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(express.json());
const PORT = process.env.PORT || 1606;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

const { mongoConnection } = require("./connection/connection");

mongoConnection(process.env.MONGO_URI);

const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRoute");
const noteRoute = require("./routes/note");
const errorMiddleware = require("./middleware/errorMiddleware");

app.use("/user", userRoute);
app.use("/", staticRoute);
app.use("/note", noteRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
