;
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
