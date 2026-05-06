const express = require("express");
const router = express.Router();
const prisma = require("../lib/db");

router.get("/", async (req, res) => {
  const builds = await prisma.build.findMany({
    orderBy: [{ recommended: "desc" }, { createdAt: "desc" }],
  });

  // Parse JSON fields before passing to template
  const parsed = builds.map((b) => ({
    ...b,
    driveDiscs: JSON.parse(b.driveDiscs || "[]"),
    mainStats: JSON.parse(b.mainStats || "{}"),
    subStats: JSON.parse(b.subStats || "[]"),
    skills: JSON.parse(b.skills || "[]"),
  }));

  res.render("builds", { title: "Builds | Ju Fufu", builds: parsed });
});

module.exports = router;
