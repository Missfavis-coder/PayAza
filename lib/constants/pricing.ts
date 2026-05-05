export const PRICING_CONSTANTS = {
  MAX_DAILY_FREE_TOKENS: 1500,
  FREE_SOCIAL_DOWNLOADS_PER_DAY: 1,

  TOKENS_PER_CREDIT: 15000,
  CREDITS_PER_DOLLAR: 10,

  CREDITS_PER_CHAT: 0.1,
  CREDITS_PER_IMAGE_GENERATION: 1,
  CREDITS_PER_IMAGE_EDIT: 1,
  CREDITS_PER_IMAGE_ANALYSIS: 0.25,
  CREDITS_PER_VOICE_ANALYSIS: 0.30,
  CREDITS_PER_VIDEO_ANALYSIS: 0.67,
  CREDITS_PER_SOCIAL_DOWNLOAD: 0.20,

  LOW_CREDIT_THRESHOLD: 3,

  PREMIUM_FEATURES: ['image_generation', 'image_editing', 'video_analysis'] as const,
  FREE_FEATURES: ['chat', 'voice_analysis', 'image_analysis', 'social_download'] as const,
} as const;

export const CREDIT_PACKAGES = [
  { id: 'starter', credits: 10, priceUSD: 1.00, pricePerCredit: 0.10 },
  { id: 'basic', credits: 25, priceUSD: 2.50, pricePerCredit: 0.10 },
  { id: 'pro', credits: 70, priceUSD: 7.00, pricePerCredit: 0.10, popular: true },
  { id: 'power', credits: 180, priceUSD: 18.00, pricePerCredit: 0.10 },
  { id: 'premium', credits: 400, priceUSD: 40.00, pricePerCredit: 0.10 },
] as const;

export type CreditPackageId = typeof CREDIT_PACKAGES[number]['id'];

export interface FeatureConfig {
  name: string;
  isPremium: boolean;
  creditsRequired: number;
}

export const FEATURES: Record<string, FeatureConfig> = {
  chat: { name: 'Chat', isPremium: false, creditsRequired: 0.1 },
  voice_analysis: { name: 'Voice Analysis', isPremium: false, creditsRequired: 0.30 },
  image_analysis: { name: 'Image Analysis', isPremium: false, creditsRequired: 0.25 },
  social_download: { name: 'Social Download', isPremium: false, creditsRequired: 0.20 },
  image_generation: { name: 'Image Generation', isPremium: true, creditsRequired: 1 },
  image_editing: { name: 'Image Editing', isPremium: true, creditsRequired: 1 },
  video_analysis: { name: 'Video Analysis', isPremium: true, creditsRequired: 0.67 },
};

export const FREE_TIER_FEATURES = [
  { text: 'Chat/Conversation', available: true, limit: '~10 messages/day' },
  { text: 'Voice Note Analysis', available: true, limit: '~5 voice notes/day' },
  { text: 'Image Analysis', available: true, limit: '~6 images/day' },
  { text: 'Social Media Download', available: true, limit: '1 free download/day' },
  { text: 'Image Generation', available: false, limit: 'Premium only' },
  { text: 'Image Editing', available: false, limit: 'Premium only' },
  { text: 'Video Analysis', available: false, limit: 'Premium only' },
] as const;

export const PAID_TIER_FEATURES = [
  { text: 'Chat/Conversation', available: true, limit: 'Unlimited' },
  { text: 'Voice Note Analysis', available: true, limit: 'Unlimited' },
  { text: 'Image Analysis', available: true, limit: 'Unlimited' },
  { text: 'Social Media Download', available: true, limit: 'Unlimited' },
  { text: 'Image Generation', available: true, limit: 'Unlimited' },
  { text: 'Image Editing', available: true, limit: 'Unlimited' },
  { text: 'Video Analysis', available: true, limit: 'Unlimited' },
] as const;

export const CREDIT_VALUE_EXAMPLES = {
  chat: { credits: 0.1, value: '1 chat message (~10 per credit)' },
  imageGeneration: { credits: 1, value: '1 AI-generated image' },
  imageEditing: { credits: 1, value: '1 image edit' },
  imageAnalysis: { credits: 0.25, value: '1 image analyzed' },
  voiceAnalysis: { credits: 0.3, value: '1 voice note processed' },
  videoAnalysis: { credits: 0.67, value: '1 video analyzed (~1.5 per credit)' },
  socialDownload: { credits: 0.2, value: '1 download (after free allowance)' },
} as const;

export const STARTER_PACKAGE_VALUE = {
  conversations: '~100 chat messages',
  images: '10 AI-generated images',
  imageAnalysis: '~40 images analyzed',
  voiceMessages: '~33 voice messages',
  videoAnalysis: '~15 videos',
  socialDownloads: '~50 downloads',
} as const;

export const PREMIUM_BLOCKED_MESSAGES = {
  image_generation: {
    title: 'Image Generation is Premium',
    body: 'Create stunning AI images with credits. Get started for just $1!',
    cta: 'Get Credits',
  },
  image_editing: {
    title: 'Image Editing is Premium',
    body: 'Transform your photos with AI editing. Unlock with credits!',
    cta: 'Get Credits',
  },
  video_analysis: {
    title: 'Video Analysis is Premium',
    body: 'Analyze any video with AI. Purchase credits to unlock!',
    cta: 'Get Credits',
  },
} as const;

export const DAILY_LIMIT_MESSAGES = {
  reached: {
    title: 'Daily Limit Reached',
    body: "You've used your free daily allowance. Come back tomorrow or get credits for unlimited access!",
    cta: 'Get Credits',
  },
  warning: {
    title: 'Running Low',
    body: "You're running low on free tokens for today. Consider getting credits!",
    cta: 'View Pricing',
  },
} as const;

export const LOW_CREDIT_MESSAGES = {
  warning: {
    title: 'Low Credits',
    body: 'Your credits are running low. Top up to continue using all features!',
    cta: 'Top Up',
  },
  depleted: {
    title: 'Credits Depleted',
    body: "You've run out of credits. You now have access to free features with daily limits.",
    cta: 'Get More Credits',
  },
} as const;

export interface UserBalance {
  credits: number;
  freeTokensUsed: number;
  freeTokensRemaining: number;
  maxDailyFreeTokens: number;
  willUseCreditsNext: boolean;
  hasCredits: boolean;
}

export function canUseFeature(
  featureKey: string,
  userBalance: UserBalance
): { allowed: boolean; reason?: string } {
  const feature = FEATURES[featureKey];

  if (!feature) {
    return { allowed: false, reason: 'Unknown feature' };
  }

  if (feature.isPremium && !userBalance.hasCredits) {
    return {
      allowed: false,
      reason: `${feature.name} is a premium feature. Purchase credits to unlock it!`,
    };
  }

  if (!userBalance.hasCredits && userBalance.freeTokensRemaining > 0) {
    return { allowed: true };
  }

  if (userBalance.hasCredits && userBalance.credits >= feature.creditsRequired) {
    return { allowed: true };
  }

  if (userBalance.hasCredits && userBalance.credits < feature.creditsRequired) {
    return {
      allowed: false,
      reason: `Not enough credits. You need ${feature.creditsRequired} credits for ${feature.name}.`,
    };
  }

  return {
    allowed: false,
    reason: 'Daily limit reached. Purchase credits or come back tomorrow!',
  };
}

export function getUserTier(credits: number): 'free' | 'paid' {
  return credits > 0 ? 'paid' : 'free';
}

export function formatCreditsDisplay(credits: number): string {
  return credits.toFixed(credits % 1 === 0 ? 0 : 2);
}
