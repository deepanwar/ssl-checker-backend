import "dotenv/config";
import express from "express";
import logger from "morgan";
import cors from "cors";

import indexRoutes from "./src/routes/index.js";

const app = express();

const PORT = process.env.NODE_PORT;

// const allowedOrigins =
//   process.env.CORS_ORIGINS?.split(",").map((item) => item?.trim()) || [];

const corsOptions = {
  // origin: function (origin, callback) {

  //   if (!origin || allowedOrigins.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));

app.use("/api", indexRoutes);

app.get("/", (req, res) => {
  res.status(200).send("SSL Checker Server is LIVE");
});

app
  .listen(PORT, () => {
    console.log(`${process.env.NODE_ENV} Server running at PORT: `, PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
