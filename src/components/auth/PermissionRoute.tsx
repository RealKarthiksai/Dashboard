import type { ReactNode } from 'react';
import { usePermission } from '@/core/authorization/PermissionContext';
import type { PermissionKey } from '@/core/authorization/permissions';
import { Forbidden } from '@/pages/error/Forbidden';

interface PermissionRouteProps {
  children: ReactNode;
  requiredPermissions?: PermissionKey[];
  requireAll?: boolean;
}

export function PermissionRoute({
  children,
  requiredPermissions = [],
  requireAll = false,
}: PermissionRouteProps) {
  const { hasAny, hasAll } = usePermission();

  if (requiredPermissions.length === 0) {
    return <>{children}</>;
  }

  const isAllowed = requireAll
    ? hasAll(requiredPermissions)
    : hasAny(requiredPermissions);

  if (!isAllowed) {
    return <Forbidden />;
  }

  return <>{children}</>;
}
