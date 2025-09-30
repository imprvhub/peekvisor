import type { InferSelectModel } from "drizzle-orm";
import type {
  users,
  websites,
  pageViews,
  customEvents,
  utmCampaigns,
  carbonFootprint,
  emailReports,
  planLimits,
  usageAlerts,
  subscriptions,
} from "./schema";

export type User = InferSelectModel<typeof users>;
export type Session = {
  user: User;
  id: string;
  expiresAt: Date;
};
export type Website = InferSelectModel<typeof websites>;
export type PageView = InferSelectModel<typeof pageViews>;
export type CustomEvent = InferSelectModel<typeof customEvents>;
export type UtmCampaign = InferSelectModel<typeof utmCampaigns>;
export type CarbonFootprint = InferSelectModel<typeof carbonFootprint>;
export type EmailReport = InferSelectModel<typeof emailReports>;
export type PlanLimit = InferSelectModel<typeof planLimits>;
export type UsageAlert = InferSelectModel<typeof usageAlerts>;
export type Subscription = InferSelectModel<typeof subscriptions>;

export type PlanType = "basic" | "flex" | "pro";
export type AlertType =
  | "website_limit_reached"
  | "data_retention_warning"
  | "upgrade_suggestion";

export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{
    pathname: string;
    views: number;
    uniqueVisitors: number;
  }>;
  topCountries: Array<{
    country: string;
    region?: string;
    city?: string;
    visitors: number;
    latitude: number;
    longitude: number;
    locationName: string;
    visitorIds: string[];
  }>;
  topDevices: Array<{
    device: string;
    visitors: number;
  }>;
  topBrowsers: Array<{
    browser: string;
    visitors: number;
  }>;
  topOS: Array<{
    os: string;
    visitors: number;
  }>;
  topResolutions: Array<{
    resolution: string;
    visitors: number;
  }>;
}

export interface PlanLimitsConfig {
  maxWebsites: number;
  dataRetentionDays: number;
  hasUnlimitedPageViews: boolean;
  hasCustomEvents: boolean;
  hasUtmTracking: boolean;
  hasDataExport: boolean;
  hasEmailReports: boolean;
  hasCarbonReports: boolean;
  hasApiAccess: boolean;
  hasPublicDashboards: boolean;
  hasPrioritySupport: boolean;
  monthlyPrice: number;
}

export interface UserWithPlan extends User {
  planLimits?: PlanLimitsConfig;
  currentUsage?: {
    websitesCount: number;
    oldestDataDate: string;
  };
}

export interface WebsiteWithStats extends Website {
  stats?: {
    totalPageViews: number;
    uniqueVisitors: number;
    lastActivity: string;
  };
}

export interface WebhookPayload {
  meta: {
    event_name: string;
    custom_data?: {
      user_id: string;
    };
  };
  data: {
    id: string;
    attributes: {
      status: string;
      product_name: string;
      variant_name: string;
      customer_id: number;
      current_period_start: string;
      current_period_end: string;
      billing_anchor?: number;
    };
  };
}
