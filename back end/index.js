const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());
let list = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let usedEmail = false;
  for (let i = 0; i < list.length; i++) {
    if (username === list[i].username) {
      usedEmail = true;
      res
        .json({ message: "the username is already in use", Permission: "no" })
        .status(402);
      break;
    }
  }

  if (!usedEmail) {
    let secretKey = "MY_SECR3T_K3Y";

    let token = jwt.sign(username, secretKey);

    let newObject = {
      username: username,
      password: password,
      arr: [],
    };
    list.push(newObject);

    // res
    // .send("the username and the password has uploaded succesfully" + token)
    // .status(201);
    res
      .json({
        message: "the username and the password has uploaded succesfully",
        Permission: "ok",
        token: token,
      })
      .status(200);
  }
});

app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let secretKey = "MY_SECR3T_K3Y";

  let exist = false;

  for (let i = 0; i < list.length; i++) {
    if (username === list[i].username && password === list[i].password) {
      let token = jwt.sign(username, secretKey);
      exist = true;
      // res.send("the login has been successful" + token).status(200);
      res
        .json({
          message: "the credentials are correct",
          permission: "ok",
          token: token,
        })
        .status(200);
    }
  }

  if (!exist) {
    res
      .json({
        message: "the given crendentials are invalid ",
        permission: "no",
      })
      .status(401);
  }
});

app.post("/add", (req, res) => {
  let username = "";
  let token = req.body.token;
  let secretKey = "MY_SECR3T_K3Y";
  jwt.verify(token, secretKey, (e, str) => {
    if (!e) {
      username = str;
    } else {
      console.error("there was an error in verifying the token");
    }
  });

  for (let i = 0; i < list.length; i++) {
    if (username === list[i].username) {
      list[i].title = req.body.title;
      list[i].desc = req.body.desc;
      list[i].img = req.body.img;
      let newObject = {
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
      };
      list[i].arr.push(newObject);
      res
        .json({
          message: "the given data has been successfully uploaded",
          title: newObject.title,
          desc: newObject.desc,
          img: newObject.img,
        })
        .status(200);
      break;
    }
  }
});

app.get("/list", (req, res) => {
  let username = "";
  const token = req.headers.authorization.split(" ")[1];
  const secretKey = "MY_SECR3T_K3Y";
  jwt.verify(token, secretKey, (e, str) => {
    if (!e) {
      username = str;
    } else {
      console.error("there was an error in verifying the token");
    }
  });
  for (let i = 0; i < list.length; i++) {
    if (username === list[i].username) {
      res.send(list[i].arr).status(200);
    }
  }
});

app.listen(port, () => {
  console.log(`The app listening on port ${port}`);
});
