const express = require("express");
const router = express.Router();
const prisma = require("../lib/db");

router.get("/", async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      take: 3,
    });

    res.render("index", {
      title: "Ju Fufu Mains",
      announcements,
    });
  } catch (err) {
    console.error("Index route error:", err.message);
    res.render("index", {
      title: "Ju Fufu Mains",
      announcements: [],
    });
  }
});

module.exports = router;