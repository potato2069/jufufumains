const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("lore", { title: "Ju Fufu Mains | Lore" });
});

module.exports = router;