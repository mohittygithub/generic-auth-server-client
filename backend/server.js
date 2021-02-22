require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth-routes.js");
const connect_db = require("./utils/db-connection.js");

// db connection
connect_db();

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
