const express = require("express");
const router = express.Router();
const prisma = require("../lib/db");

// Returns all announcements as JSON
router.get("/announcements", async (req, res) => {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
  });
  res.json(announcements);
});

module.exports = router;
