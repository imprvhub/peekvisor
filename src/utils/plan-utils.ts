import { db } from '../db';
import { users, websites } from '../db/schema';
import { eq, and, count } from 'drizzle-orm';
import type { PlanType, PlanLimitsConfig } from '../db/types';

export const PLAN_CONFIG: Record<PlanType, PlanLimitsConfig> = {
  basic: {
    maxWebsites: 1,
    dataRetentionDays: 30,
    hasUnlimitedPageViews: true,
    hasCustomEvents: false,
    hasUtmTracking: false,
    hasDataExport: false,
    hasEmailReports: false,
    hasCarbonReports: false,
    hasCustomSubdomains: false,
    hasApiAccess: false,
    hasPublicDashboards: false,
    hasPrioritySupport: false,
    monthlyPrice: 0 // Free
  },
  flex: {
    maxWebsites: 5,
    dataRetentionDays: 180,
    hasUnlimitedPageViews: true,
    hasCustomEvents: true,
    hasUtmTracking: true,
    hasDataExport: true,
    hasEmailReports: true,
    hasCarbonReports: false,
    hasCustomSubdomains: false,
    hasApiAccess: false,
    hasPublicDashboards: false,
    hasPrioritySupport: false,
    monthlyPrice: 1200 // $12/month (DECOY)
  },
  pro: {
    maxWebsites: -1, // Unlimited
    dataRetentionDays: -1, // Unlimited
    hasUnlimitedPageViews: true,
    hasCustomEvents: true,
    hasUtmTracking: true,
    hasDataExport: true,
    hasEmailReports: true,
    hasCarbonReports: true,
    hasCustomSubdomains: true,
    hasApiAccess: true,
    hasPublicDashboards: true,
    hasPrioritySupport: true,
    monthlyPrice: 1500 // $15/month
  }
};

export async function getUserPlanLimits(userId: string): Promise<PlanLimitsConfig> {
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user.length) throw new Error('User not found');
  
  const planType = user[0].plan as PlanType;
  return PLAN_CONFIG[planType] || PLAN_CONFIG.basic;
}

export async function canCreateWebsite(userId: string): Promise<boolean> {
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user.length) return false;
  
  const planType = user[0].plan as PlanType;
  const planLimits = PLAN_CONFIG[planType];
  
  if (planLimits.maxWebsites === -1) return true; // Unlimited
  
  const websiteCount = await db
    .select({ count: count() })
    .from(websites)
    .where(eq(websites.userId, userId));
  
  return (websiteCount[0]?.count || 0) < planLimits.maxWebsites;
}

export async function getUserWebsiteCount(userId: string): Promise<number> {
  const websiteCount = await db
    .select({ count: count() })
    .from(websites)
    .where(eq(websites.userId, userId));
  
  return websiteCount[0]?.count || 0;
}

export function canUseFeature(planType: PlanType, feature: keyof PlanLimitsConfig): boolean {
  const config = PLAN_CONFIG[planType];
  return Boolean(config[feature]);
}

export function getDataRetentionDays(planType: PlanType): number {
  const config = PLAN_CONFIG[planType];
  return config.dataRetentionDays;
}

export function getMaxWebsites(planType: PlanType): number {
  const config = PLAN_CONFIG[planType];
  return config.maxWebsites;
}

export function getPlanDisplayName(planType: PlanType): string {
  const names = {
    basic: 'Basic',
    flex: 'Flex',
    pro: 'Pro'
  };
  return names[planType] || 'Basic';
}

export function getPlanPrice(planType: PlanType): string {
  const config = PLAN_CONFIG[planType];
  if (config.monthlyPrice === 0) return 'Free';
  return `$${(config.monthlyPrice / 100).toFixed(0)}/month`;
}

export function getPlanFeatures(planType: PlanType): string[] {
  const config = PLAN_CONFIG[planType];
  const features: string[] = [];
  
  if (config.maxWebsites === -1) {
    features.push('Unlimited websites');
  } else {
    features.push(`${config.maxWebsites} website${config.maxWebsites > 1 ? 's' : ''}`);
  }
  
  if (config.dataRetentionDays === -1) {
    features.push('Unlimited data retention');
  } else {
    features.push(`${config.dataRetentionDays} days data retention`);
  }
  
  if (config.hasUnlimitedPageViews) features.push('Unlimited page views');
  if (config.hasCustomEvents) features.push('Custom events tracking');
  if (config.hasUtmTracking) features.push('UTM campaign tracking');
  if (config.hasDataExport) features.push('Data export (Excel/CSV)');
  if (config.hasEmailReports) features.push('Weekly email reports');
  if (config.hasCarbonReports) features.push('CO₂ tracking');
  if (config.hasCustomSubdomains) features.push('Custom subdomains');
  if (config.hasApiAccess) features.push('API access');
  if (config.hasPublicDashboards) features.push('Public dashboards');
  if (config.hasPrioritySupport) features.push('Priority support');
  
  return features;
}