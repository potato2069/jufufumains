const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const prisma = new PrismaClient();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
  console.log("=== Create Admin User ===\n");

  const username = await ask("Username: ");
  const password = await ask("Password: ");

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    console.log(`\nUser "${username}" already exists.`);
    rl.close();
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { username, password: hash, role: "admin" },
  });

  console.log(`\nAdmin "${user.username}" created successfully.`);
  rl.close();
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());