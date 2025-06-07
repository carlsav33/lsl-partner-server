const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const PASSWORD = "l1zz4nn34PL4Yr1d3r";
let partnerships = {};

function checkPW(req, res) {
  if (req.query.PW !== PASSWORD) {
    res.status(401).send("Unauthorized: Invalid password");
    return false;
  }
  return true;
}

app.get("/get_partner", (req, res) => {
  if (!checkPW(req, res)) return;
  const user = req.query.User;
  if (!user) return res.status(400).send("Missing User parameter");
  res.send(partnerships[user] || "");
});

app.get("/set_partner", (req, res) => {
  if (!checkPW(req, res)) return;
  const { User, Partner } = req.query;
  if (!User || Partner === undefined) return res.status(400).send("Missing parameters");
  if (Partner === "") delete partnerships[User];
  else partnerships[User] = Partner;
  res.send("OK");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});