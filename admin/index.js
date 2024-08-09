import { config } from "dotenv";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import inquirer from "inquirer";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { generateIdFromEntropySize } from "lucia";
import bcrypt from "bcrypt";
config();

const user = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  userType: text("user_type").default("customer"),
  createdAt: timestamp("created_at").defaultNow(),
  isVerified: boolean("is_verified").default(false),
});

const emailUser = pgTable("email_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").references(() => user.email),
  password: text("password").notNull(),
});

const questions = [
  {
    type: "input",
    name: "username",
    message: "Enter your username:",
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email:",
    validate: function (value) {
      const pass = value.match(
        /^([a-zA-Z0-9_\.\-])+\@([a-zA-Z0-9_\.\-])+\.([a-zA-Z]{2,4})$/
      );
      if (pass) {
        return true;
      }

      return "Please enter a valid email";
    },
  },
  {
    type: "password",
    name: "password",
    message: "Enter your password:",
    mask: "*",
  },
];

inquirer.prompt(questions).then(async (answers) => {
  const queryClient = postgres(process.env.DB_URL);
  const db = drizzle(queryClient);
  const id = generateIdFromEntropySize(10);
  await db.insert(user).values({
    id,
    username: answers.username,
    email: answers.email,
    userType: "admin",
    isVerified: true,
  });
  const hashedPassword = await bcrypt.hash(answers.password, 10);
  await db.insert(emailUser).values({
    email: answers.email,
    password: hashedPassword,
  });
  console.log("admin account created");
  process.exit();
});
