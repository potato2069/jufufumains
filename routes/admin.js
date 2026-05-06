const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const prisma = require("../lib/db");

// Middleware: require admin session for protected routes
function requireAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.redirect("/admin/login");
}

// ── Login ──────────────────────────────────────────────────────
router.get("/login", (req, res) => {
  res.render("admin/login", { title: "Admin Login", error: null });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || user.role !== "admin") {
    return res.render("admin/login", { title: "Admin Login", error: "Invalid credentials." });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    req.session.isAdmin = true;
    req.session.userId = user.id;
    res.redirect("/admin");
  } else {
    res.render("admin/login", { title: "Admin Login", error: "Invalid credentials." });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

// ── Dashboard ──────────────────────────────────────────────────
router.get("/", requireAdmin, async (req, res) => {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });
  const builds = await prisma.build.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.render("admin/dashboard", {
    title: "Admin Dashboard",
    announcements,
    builds,
  });
});

// ── Announcements ──────────────────────────────────────────────
router.post("/announcements", requireAdmin, async (req, res) => {
  const { title, content, pinned } = req.body;
  await prisma.announcement.create({
    data: { title, content, pinned: pinned === "on" },
  });
  res.redirect("/admin");
});

router.post("/announcements/:id/delete", requireAdmin, async (req, res) => {
  await prisma.announcement.delete({ where: { id: Number(req.params.id) } });
  res.redirect("/admin");
});

// ── Builds ─────────────────────────────────────────────────────
router.post("/builds", requireAdmin, async (req, res) => {
  const { name, description, wEngine, driveDiscs, mainStats, skills, notes, recommended } = req.body;

  // driveDiscs and skills come in as comma-separated strings from the form
  const discsArray = driveDiscs.split(",").map((s) => s.trim()).filter(Boolean);
  const skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);

  let mainStatsObj = {};
  try { mainStatsObj = JSON.parse(mainStats || "{}"); } catch {}

  await prisma.build.create({
    data: {
      name,
      description,
      wEngine,
      driveDiscs: JSON.stringify(discsArray),
      mainStats: JSON.stringify(mainStatsObj),
      subStats: "[]",
      skills: JSON.stringify(skillsArray),
      notes: notes || null,
      recommended: recommended === "on",
    },
  });
  res.redirect("/admin");
});

router.post("/builds/:id/delete", requireAdmin, async (req, res) => {
  await prisma.build.delete({ where: { id: Number(req.params.id) } });
  res.redirect("/admin");
});

module.exports = router;
