// REFERENCES \\
// google clooud terminal
// https://console.cloud.google.com/appengine/start?project=blissful-mantis-299316
//
// datastore example
// https://cloud.google.com/appengine/docs/standard/nodejs/using-cloud-datastore
//
// authentication
// https://www.youtube.com/watch?v=Ud5xKCYQTjM
//
//
// NOTES
// not authenticating existing user properly using bcrypt compare

const express = require("express");
const bcrypt = require("bcrypt");
var path = require("path");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static("public"));

// temporary "database" object
const users = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/getUsers", (req, res) => {
  res.send(users);
});

app.post("/createAccount", async (req, res) => {
  console.log("registering new user ");
  console.log(req.body);
  // create salt and hash password
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    // new user object to put in database
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    // TODO add to a real database
    users.push(user);
    // okay status
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/login", async (req, res) => {
  const user = users.find((user) => user.username == req.body.username); // finds username
  console.log("found matching user: " + JSON.stringify(user));

  if (user == null) {
    res.status(400).send("cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send("user " + user.username + " has logged in");
    } else {
      res.status(400).send("wrong password");
    }
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log("app listening on port " + port);
});

module.exports = app;
