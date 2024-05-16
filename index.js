const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 4549;
const mongoURI = process.env.MONGO_URI;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret_token = process.env.ACCESS_TOKEN_SECRET;

//app
const app = express();

//middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//mongo client
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//cookies options
const cookieOptions = {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

const run = async () => {
  try {
    await client.connect();
  } finally {
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  }
};

run().catch((error) => console.log);

app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.listen(port, () => console.log("Server Running On Port"), port);
