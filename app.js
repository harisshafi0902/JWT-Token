const express = require("express");
const app = express();
let PORT = 3000;
const sendMail = require("./controllers/sendMail");

app.get("/", (req, res) => {
  res.send("i am a server");
});

app.get("/mail", sendMail);

const start = async () => {
  try {
    app.listen(3000, () => {
      console.log("i am live in port no. 3000 ${PORT}");
    });
  } catch (error) {}
};
start();
