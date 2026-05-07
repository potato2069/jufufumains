const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("calculator", { title: "Ju Fufu Mains | Calculator" });
});

module.exports = router;