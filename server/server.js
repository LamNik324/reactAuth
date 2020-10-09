import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import db from "./db.js";
import fs from "fs";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
  })
);

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.find(
    (user) => {
     return user.email === email && user.password === password
    }
  );
  console.log(user);
  if (user) {
    req.session.user = {
      email
    };
    return res.end();
  } else {
    res.status(401).end();
  }
});

app.get(
  "/api/secret",
  (req, res, next) => {
    if (req.session.user) {
      return next();
    } else {
      res.status(401).end();
    }
  },
  (req, res) => {
    res.json({
      email: req.session.user.email,
    });
  }
);

app.get("*", async (req, res) => {
  const index = await fs.promises.readFile("../build/index.html", "utf-8");
  res.send(index);
});

// app.use((req, res, next) => {
//   if (req.session.user) {
//     return next()
//   } else {
//     res.status(401).end()
//   }
// })



app.listen(process.env.PORT ?? 3001);
