import { Suspense } from 'react';
import { useExperience } from '@/core/experiences/ExperienceProvider';
import { DASHBOARD_REGISTRY } from '@/core/dashboard/dashboard.registry';
import { PageLoadingFallback } from '@/shared/components/feedback/PageLoadingFallback';

export function ExperienceDashboard() {
  const { activeExperience } = useExperience();
  const Component = DASHBOARD_REGISTRY[activeExperience.dashboard];

  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Component />
    </Suspense>
  );
}
