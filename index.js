const express = require("express");
const cors = require("cors");

const app = express(); // ✅ Define app here!
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const PARTNER_DATA = {}; // In-memory database

// Health check
app.get("/", (req, res) => {
  res.send("LSL Partnership Server is alive!");
});

// Set partner
app.post("/set_partner", (req, res) => {
  const { User, Partner, PW } = req.body;
  if (PW !== process.env.PW) return res.status(403).send("Unauthorized");

  PARTNER_DATA[User] = Partner;
  PARTNER_DATA[Partner] = User;
  res.send({ status: "ok", Partner });
});

// Get partner
app.get("/get_partner", (req, res) => {
  const { User, PW } = req.query;
  if (PW !== process.env.PW) return res.status(403).send("Unauthorized");

  const partner = PARTNER_DATA[User];
  if (!partner) return res.status(404).send("No partner found");

  res.send({ status: "ok", Partner: partner });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
