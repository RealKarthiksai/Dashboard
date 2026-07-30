import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_FEATURE_FLAGS, type FeatureFlagKey } from './flags';

interface FeatureFlagContextType {
  flags: Record<FeatureFlagKey, boolean>;
  isFeatureEnabled: (flag: FeatureFlagKey) => boolean;
  setFlag: (flag: FeatureFlagKey, enabled: boolean) => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flags, setFlags] = useState<Record<FeatureFlagKey, boolean>>(DEFAULT_FEATURE_FLAGS);

  const isFeatureEnabled = (flag: FeatureFlagKey): boolean => {
    return flags[flag] ?? false;
  };

  const setFlag = (flag: FeatureFlagKey, enabled: boolean) => {
    setFlags((prev) => ({ ...prev, [flag]: enabled }));
  };

  return (
    <FeatureFlagContext.Provider value={{ flags, isFeatureEnabled, setFlag }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlag = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlag must be used within a FeatureFlagProvider');
  }
  return context;
};
