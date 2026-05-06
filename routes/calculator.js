const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("calculator", { title: "Calculator | Ju Fufu" });
});

module.exports = router;