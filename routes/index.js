const express = require("express");
const router = express.Router();
const prisma = require("../lib/db");

router.get("/", async (req, res) => {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    take: 3,
  });

  const featuredBuilds = await prisma.build.findMany({
    where: { recommended: true },
    take: 3,
  });

  res.render("index", {
    title: "Ju Fufu Mains",
    announcements,
    featuredBuilds,
  });
});

module.exports = router;
