require("dotenv").config();

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET === "replace-this-with-a-long-random-string") {
  console.error("ERROR: SESSION_SECRET is not set in your .env file. Server will not start.");
  process.exit(1);
}

const trustProxy = process.env.TRUST_PROXY === "true";
const secureCookie = process.env.SESSION_COOKIE_SECURE === "true";

const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const path = require("path");

const indexRouter = require("./routes/index");
const buildsRouter = require("./routes/builds");
const calculatorRouter = require("./routes/calculator")
const loreRouter = require("./routes/lore")
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");

const app = express();
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;

if (trustProxy) {
  app.set("trust proxy", 1);
}

// Helmet Configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      scriptSrc: ["'self'"],
    },
  },
}));

// Login limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 attempts per 15 minutes per IP
  message: "Too many login attempts. Try again in 15 minutes.",
});

app.use("/admin/login", loginLimiter);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions (stored in memory, resets on server restart)
app.use(
  session({
    store: new MemoryStore({ checkPeriod: 1000 * 60 * 60 * 8 }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 8,
      secure: secureCookie,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Make session available in all EJS templates
app.use((req, res, next) => {
  res.locals.isAdmin = req.session.isAdmin || false;
  next();
});

// Routes
app.use("/", indexRouter);
app.use("/builds", buildsRouter);
app.use("/calculator", calculatorRouter);
app.use("/lore", loreRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// Start
app.listen(PORT, HOST, () => {
  console.log(`Fufus here! Running at http://${HOST}:${PORT}`);
});
