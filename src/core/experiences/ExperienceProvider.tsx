import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { usePermission } from '../authorization/PermissionContext';
import { EXPERIENCE_REGISTRY } from './experience.registry';
import type { ExperienceConfig } from './experience.types';

interface ExperienceContextType {
  activeExperience: ExperienceConfig;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const { currentRole } = usePermission();

  const activeExperience = useMemo(() => {
    return EXPERIENCE_REGISTRY[currentRole] || EXPERIENCE_REGISTRY.Organization_Owner;
  }, [currentRole]);

  return (
    <ExperienceContext.Provider value={{ activeExperience }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
}
