import type { Period } from "./common";

export interface DashboardOverviewParams {
  period?: Period;
}

export interface RecentActivity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export interface StreakInfo {
  current: number;
  longest: number;
  freezesRemaining: number;
}

export interface RankInfo {
  position: number;
  total: number;
  percentile: number;
  name: string;
}

export interface DashboardOverviewResponse {
  period: Period;
  activeIntegrations: number;
  recentActivity: RecentActivity[];
  stats: {
    availableCredit: number;
    creditBurnRate: number;
    dailyTokenLimit: number;
    dailyTokenResetTime: string;
    dailyTokensLeft: number;
    dailyTokensUsed: number;
    totalCreditUsed: number;
    streak: StreakInfo;
    rank: RankInfo;
  };
  tokenUsageChart: {
    date: string;
    tokens: number;
  }[];
}
