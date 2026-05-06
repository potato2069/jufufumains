const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("lore", { title: "Lore | Ju Fufu" });
});

module.exports = router;