const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("builds", { title: "Ju Fufu Mains | Builds" });
});

module.exports = router;