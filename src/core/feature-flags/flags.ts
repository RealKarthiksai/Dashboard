export const FeatureFlags = {
  ENABLE_VIRTUALIZATION: 'ENABLE_VIRTUALIZATION',
  ENABLE_ADVANCED_ANALYTICS: 'ENABLE_ADVANCED_ANALYTICS',
  ENABLE_BETA_FEATURES: 'ENABLE_BETA_FEATURES',
} as const;

export type FeatureFlagKey = keyof typeof FeatureFlags;

export const DEFAULT_FEATURE_FLAGS: Record<FeatureFlagKey, boolean> = {
  ENABLE_VIRTUALIZATION: true,
  ENABLE_ADVANCED_ANALYTICS: true,
  ENABLE_BETA_FEATURES: false,
};
