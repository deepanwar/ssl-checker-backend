import "dotenv/config";
import express from "express";
import logger from "morgan";
import cors from "cors";

import indexRoutes from "./routes/index.js";

const app = express();

const PORT = process.env.NODE_PORT;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(logger("dev"));

app.use("/api", indexRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app
  .listen(PORT, () => {
    console.log(`${process.env.NODE_ENV} Server running at PORT: `, PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
