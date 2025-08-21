import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
  unique,
  real,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  fullName: text("full_name"),
  userName: text("user_name").unique(),
  email: text("email").notNull().unique(),
  profilePhoto: text("profile_photo"),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .default(false)
    .notNull(),
  isBlocked: integer("is_blocked", { mode: "boolean" }).default(false),
  isDeleted: integer("is_deleted", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  plan: text("plan", { enum: ["basic", "flex", "pro"] })
    .default("basic")
    .notNull(),
  planExpiresAt: integer("plan_expires_at"),
  lemonSqueezyCustomerId: text("lemon_squeezy_customer_id"),
});

export const oauthTokens = sqliteTable(
  "oauth_tokens",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    strategy: text("strategy", { enum: ["google", "github"] }).notNull(),
    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.strategy] }),
    };
  },
);

export const oauthTokenRelations = relations(oauthTokens, ({ one }) => ({
  user: one(users, {
    fields: [oauthTokens.userId],
    references: [users.id],
  }),
}));

export const sessions = sqliteTable("sessions", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at").notNull(),
});

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
  loginLog: one(loginLogs),
}));

export const loginLogs = sqliteTable("login_logs", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  sessionId: text("session_id").references(() => sessions.id, {
    onDelete: "set null",
  }),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  browser: text("browser").notNull(),
  device: text("device").notNull(),
  os: text("os").notNull(),
  ip: text("ip").notNull(),
  loggedInAt: text("logged_in_at").default(sql`CURRENT_TIMESTAMP`),
});

export const loginLogsRelations = relations(loginLogs, ({ one }) => ({
  user: one(users, {
    fields: [loginLogs.userId],
    references: [users.id],
  }),
  session: one(sessions, {
    fields: [loginLogs.sessionId],
    references: [sessions.id],
  }),
}));

export const subscriptions = sqliteTable("subscriptions", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lemonSqueezySubscriptionId: text("lemon_squeezy_subscription_id").notNull(),
  status: text("status", {
    enum: ["active", "past_due", "unpaid", "cancelled", "expired", "on_trial"],
  }).notNull(),
  planType: text("plan_type", { enum: ["basic", "flex", "pro"] }).notNull(),
  currentPeriodStart: integer("current_period_start").notNull(),
  currentPeriodEnd: integer("current_period_end").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

export const websites = sqliteTable(
  "websites",
  {
    id: text("id")
      .$default(() => createId())
      .primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    domain: text("domain").notNull(),
    name: text("name").notNull(),
    isActive: integer("is_active", { mode: "boolean" }).default(true),
    trackingCode: text("tracking_code").notNull().unique(),
    publicDashboard: integer("public_dashboard", { mode: "boolean" }).default(
      false,
    ),
    customSubdomain: text("custom_subdomain").unique(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      userDomainUnique: unique().on(table.userId, table.domain),
    };
  },
);

export const pageViews = sqliteTable("page_views", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  websiteId: text("website_id")
    .notNull()
    .references(() => websites.id, { onDelete: "cascade" }),
  sessionId: text("session_id").notNull(),
  visitorId: text("visitor_id").notNull(),
  pathname: text("pathname").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  country: text("country"),
  device: text("device"),
  browser: text("browser"),
  os: text("os"),
  screenSize: text("screen_size"),
  timestamp: integer("timestamp").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const customEvents = sqliteTable("custom_events", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  websiteId: text("website_id")
    .notNull()
    .references(() => websites.id, { onDelete: "cascade" }),
  sessionId: text("session_id").notNull(),
  visitorId: text("visitor_id").notNull(),
  eventName: text("event_name").notNull(),
  eventData: text("event_data"),
  pathname: text("pathname"),
  timestamp: integer("timestamp").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const utmCampaigns = sqliteTable("utm_campaigns", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  websiteId: text("website_id")
    .notNull()
    .references(() => websites.id, { onDelete: "cascade" }),
  sessionId: text("session_id").notNull(),
  visitorId: text("visitor_id").notNull(),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmTerm: text("utm_term"),
  utmContent: text("utm_content"),
  timestamp: integer("timestamp").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const carbonFootprint = sqliteTable(
  "carbon_footprint",
  {
    id: text("id")
      .$default(() => createId())
      .primaryKey(),
    websiteId: text("website_id")
      .notNull()
      .references(() => websites.id, { onDelete: "cascade" }),
    date: text("date").notNull(), // YYYY-MM-DD
    pageViews: integer("page_views").default(0),
    dataTransferMB: real("data_transfer_mb").default(0),
    co2GramsEstimated: real("co2_grams_estimated").default(0),
    energyWattHours: real("energy_watt_hours").default(0),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      websiteDateUnique: unique().on(table.websiteId, table.date),
    };
  },
);

export const emailReports = sqliteTable("email_reports", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  websiteId: text("website_id")
    .notNull()
    .references(() => websites.id, { onDelete: "cascade" }),
  frequency: text("frequency", { enum: ["weekly", "monthly"] }).notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  lastSent: text("last_sent"),
  nextScheduled: text("next_scheduled"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const planLimits = sqliteTable("plan_limits", {
  planType: text("plan_type", { enum: ["basic", "flex", "pro"] }).primaryKey(),
  maxWebsites: integer("max_websites").notNull(),
  dataRetentionDays: integer("data_retention_days").notNull(),
  hasUnlimitedPageViews: integer("has_unlimited_page_views", {
    mode: "boolean",
  }).default(true),
  hasCustomEvents: integer("has_custom_events", { mode: "boolean" }).default(
    false,
  ),
  hasUtmTracking: integer("has_utm_tracking", { mode: "boolean" }).default(
    false,
  ),
  hasDataExport: integer("has_data_export", { mode: "boolean" }).default(false),
  hasEmailReports: integer("has_email_reports", { mode: "boolean" }).default(
    false,
  ),
  hasCarbonReports: integer("has_carbon_reports", { mode: "boolean" }).default(
    false,
  ),
  hasCustomSubdomains: integer("has_custom_subdomains", {
    mode: "boolean",
  }).default(false),
  hasApiAccess: integer("has_api_access", { mode: "boolean" }).default(false),
  hasPublicDashboards: integer("has_public_dashboards", {
    mode: "boolean",
  }).default(false),
  hasPrioritySupport: integer("has_priority_support", {
    mode: "boolean",
  }).default(false),
  monthlyPrice: integer("monthly_price").notNull(), // in cents
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const usageAlerts = sqliteTable("usage_alerts", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  alertType: text("alert_type", {
    enum: [
      "website_limit_reached",
      "data_retention_warning",
      "upgrade_suggestion",
    ],
  }).notNull(),
  triggeredAt: integer("triggered_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  acknowledged: integer("acknowledged", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
  oauthTokens: many(oauthTokens),
  sessions: many(sessions),
  loginLogs: many(loginLogs),
  subscriptions: many(subscriptions),
  websites: many(websites),
  emailReports: many(emailReports),
  usageAlerts: many(usageAlerts),
}));

export const websitesRelations = relations(websites, ({ one, many }) => ({
  user: one(users, {
    fields: [websites.userId],
    references: [users.id],
  }),
  pageViews: many(pageViews),
  customEvents: many(customEvents),
  utmCampaigns: many(utmCampaigns),
  carbonFootprint: many(carbonFootprint),
  emailReports: many(emailReports),
}));

export const pageViewsRelations = relations(pageViews, ({ one }) => ({
  website: one(websites, {
    fields: [pageViews.websiteId],
    references: [websites.id],
  }),
}));

export const customEventsRelations = relations(customEvents, ({ one }) => ({
  website: one(websites, {
    fields: [customEvents.websiteId],
    references: [websites.id],
  }),
}));

export const utmCampaignsRelations = relations(utmCampaigns, ({ one }) => ({
  website: one(websites, {
    fields: [utmCampaigns.websiteId],
    references: [websites.id],
  }),
}));

export const carbonFootprintRelations = relations(
  carbonFootprint,
  ({ one }) => ({
    website: one(websites, {
      fields: [carbonFootprint.websiteId],
      references: [websites.id],
    }),
  }),
);

export const emailReportsRelations = relations(emailReports, ({ one }) => ({
  user: one(users, {
    fields: [emailReports.userId],
    references: [users.id],
  }),
  website: one(websites, {
    fields: [emailReports.websiteId],
    references: [websites.id],
  }),
}));

export const planLimitsRelations = relations(planLimits, ({ many }) => ({
  // Configuration table - no direct relations
}));

export const usageAlertsRelations = relations(usageAlerts, ({ one }) => ({
  user: one(users, {
    fields: [usageAlerts.userId],
    references: [users.id],
  }),
}));
