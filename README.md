# Ju Fufu Mains

A page about all things Ju Fufu! From Zenless Zone Zero! By Ju Fufu Mains.

I made this as a planned side project for the Ju Fufu Mains server a year ago, but was unable to make any progress on it until now.

Anyone can use this to start their own "Mains" website. I made this as accessible and easy to learn and develop as possible. This can also serve as a learning experience for others to learn and start Node.js applications such as this in the future!

---

## First Time Setup

### Prerequisites

Make sure you have **Node.js** installed.

- **Windows** — download and install from https://nodejs.org (LTS version)
- **Linux/Mac** — install via your package manager, https://nodejs.org, or the following command:
```
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
```

To check if Node is installed, run this command:
```
node -v
```
You should see a version number. If not, install Node first.

Note for Windows users: We recommend running this project inside WSL (Windows Subsystem  for Linux) rather than directly in Command Prompt or PowerShell. If you don't have WSL, 
search "WSL" in the Microsoft Store and install Ubuntu.

---

### 1. Clone or download the project

**Windows (Command Prompt or PowerShell):**
```
cd C:\Users\YourName\Documents
git clone https://github.com/potato2069/jufufumains.git
cd jufufumains
```

**Linux/Mac:**
```
cd ~/
git clone https://github.com/potato2069/jufufumains.git
cd jufufumains
```

Note:
To make things easier for yourself, install the Github Desktop app:
https://desktop.github.com/download/

---

### 2. Install dependencies

Run this command to install the package:
```
npm install
```

---

### 3. Create your .env file

**Windows:**
```
copy .env.example .env
```

**Linux/Mac:**
```
cp .env.example .env
```

Then open `.env` in any text editor and fill it in. See the **.env Guide** section below.

---

### 4. Create the database

```
npm run db:push
```

This creates the database file automatically. You only need to run this once, or again if you ever change `prisma/schema.prisma`.

---

### 5. Creating an admin account

```
npm run adminaccount
```

This will ask you to type a username and password. That becomes your admin login at `/admin`. You can run this again any time to add more admin accounts.


### 6. Start the server

For development (auto-restarts when you save files):
```
npm run dev
```

For running it normally:
```
npm start
```

Then open your browser and go to **http://localhost:3000**

---

## Running with Docker

If you don't want to install Node.js on your computer, you can run the project with Docker instead.

Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

```bash
# First time
cp .env.example .env   # fill in your SESSION_SECRET
docker compose up --build

# Create your admin account
docker compose exec app node prisma/adminaccount.js

# Important commands to use
docker compose up      # start
docker compose down    # stop
```

Open your browser at http://localhost:3000

# NOTES

## .env Guide

Your `.env` file lives in the project root and should look like this:

```
PORT=3000
HOST=0.0.0.0
SESSION_SECRET=generate-this-with-the-command-below
APP_BASE_URL=http://localhost:3000

# Leave both false during development.
# Set both to true once you have Nginx + HTTPS set up on your server.
TRUST_PROXY=false
SESSION_COOKIE_SECURE=false
```

**SESSION_SECRET** — a long random string used to sign session cookies. Generate one by running:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output into your `.env`.

**APP_BASE_URL** — your site's full URL. Use `http://localhost:3000` while developing. When it is deployed, change it to `https://yourdomain.com`.

**TRUST_PROXY and SESSION_COOKIE_SECURE** — leave both `false` during development. When you deploy with Nginx and HTTPS, set both to `true`.

---

## Adding a New Page

1. Create a route file in `routes/` — copy `routes/lore.js` as a starting point since it's the simplest one

2. Register it in `server.js`:
   ```js
   const myPageRouter = require("./routes/mypage");
   app.use("/mypage", myPageRouter);
   ```
   
3. Create a `views/mypage.ejs` file — start with this structure:
   ```html
   <%- include('partials/head') %>
   <%- include('partials/navbar') %>

   <main>
     <h1>My Page</h1>
     <!-- your content here -->
   </main>

   <%- include('partials/footer') %>
   ```

---

## Relevant Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (auto-restarts on save) |
| `npm start` | Start the server normally |
| `npm run db:push` | Apply database schema changes |
| `npm run db:studio` | Open a visual database browser |
| `npm run adminaccount` | Create a new admin account |
| `npm install` | Install all dependencies |