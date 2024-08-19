import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  index,
  numeric,
  integer,
} from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
// user table

export const user = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  userType: text("user_type").default("customer"),
  createdAt: timestamp("created_at").defaultNow(),
  isVerified: boolean("is_verified").default(false),
});
export type userSelectType = InferSelectModel<typeof user>;
// auth table
export const emailUser = pgTable("email_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").references(() => user.email),
  password: text("password").notNull(),
});

export const googleOauthUser = pgTable("google_oauth_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").references(() => user.email),
  google_id: text("google_id").unique().default(""),
});

export const VerificationCode = pgTable("verification_codes", {
  id: uuid("id").primaryKey().defaultRandom(),
  verificationCode: text("verification_code").notNull(),
  userId: text("user_id").references(() => user.id),
  purpose: text("purpose").default("verify_account"),
  expiry: timestamp("expires_at").default(
    new Date(Date.now() + 1000 * 60 * 60)
  ),
});

export const session = pgTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

// Product tables
export const category = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    description: text("description").notNull().unique(),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    category_nameIdx: index("category_name_indx").on(table.name),
  })
);

export const product = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: numeric("price").notNull(),
    quantity: integer("quantity").notNull(),
    categoryId: uuid("category_id").references(() => category.id),
    productImage: text("productImage").notNull(),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    product_name_indx: index("product_name_indx").on(table.name),
  })
);

export const review = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => user.id),
  productId: uuid("product_id").references(() => product.id),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// cart table
export const Cart = pgTable("cart", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => user.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const CartItems = pgTable("cartItems", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id").references(() => Cart.id),
  productId: uuid("product_id").references(() => product.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// order tables

export const order = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").references(() => user.id),
  orderDate: timestamp("order_date").defaultNow(),
  status: text("status").default("pending"),
  totalAmount: numeric("total_amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItem = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").references(() => order.id),
  productId: uuid("product_id").references(() => product.id),
  quantity: integer("quantity").notNull(),
  price: numeric("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payment = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("id").references(() => order.id),
  paymentMethod: text("payment_method").notNull(),
  amount: numeric("amount").notNull(),
  status: boolean("status").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
