const express = require("express");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { UserLogin } = require("./generateAccessToken");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected successful: " + connection.threadId);
});
const port = process.env.PORT;
app.listen(port, () => console.log(`Server Started on port ${port}...`));

app.use(express.json());
app.use("/", (req, _, next) => {
  req.db = db;
  next();
});

//CREATE USER
app.post("/createUser", async (req, res) => {
  const user = req.body.name;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM userTable WHERE user = ?";
    const search_query = mysql.format(sqlSearch, [user]);
    const sqlInsert = "INSERT INTO userTable(user, password) VALUES (?,?)";
    const insert_query = mysql.format(sqlInsert, [user, hashedPassword]);
    connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);

      if (result.length != 0) {
        connection.release();
        console.log("------> User already exists");
        res.sendStatus(409);
        console.log("result", result);
      } else {
        connection.query(insert_query, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("--------> Created new User");
          console.log(result.insertId);
          res.sendStatus(201);
        });
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
});

//LOGIN (AUTHENTICATE USER)
app.post("/login", UserLogin);

app.post("/resetpassword", (req, res) => {
  // get email from body
  const email = req.body.email;
  sendEmail(email);
  res.send(body.name);
});

// find user by that email
// if does not exist throw error
// if exist create token
// create random token and save it to DB
// create encoded token and use it on forget pass word API
//  user =  {
//     id: 1
//   }
// send token url on that email
// Example: http://localhost:3000/forgetpassword/{token}
