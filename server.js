const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const mongo_uri =
//   "mongodb://localhost:27017/testing?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const mongo_uri = "mongodb://localhost:27017/testing";

mongoose.Promise = global.Promise;

mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  (error) => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);

app.get("/", (req, res) => {
  res.status(200).send("test");
});

const User = require("./model/user_model");

app.get("/user", (req, res) => {
  User.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

app.post("/add/user", (req, res) => {
  // console.log(req.body);
  const obj = new User(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
  });
});

app.get("/user/:_id", (req, res) => {
  User.findById(req.params._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

app.listen(3000, () => {
  console.log("Server running 3000");
});
