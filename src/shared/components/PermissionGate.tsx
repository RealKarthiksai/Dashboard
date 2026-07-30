import type { ReactNode } from 'react';
import { usePermission } from '@/core/authorization/PermissionContext';
import type { PermissionKey } from '@/core/authorization/permissions';

interface PermissionGateProps {
  children: ReactNode;
  required?: PermissionKey;
  hasAny?: PermissionKey[];
  hasAll?: PermissionKey[];
  fallback?: ReactNode;
}

export function PermissionGate({
  children,
  required,
  hasAny: anyPermissions,
  hasAll: allPermissions,
  fallback = null,
}: PermissionGateProps) {
  const { can, hasAny, hasAll } = usePermission();

  let isAllowed = true;

  if (required && !can(required)) {
    isAllowed = false;
  }

  if (anyPermissions && !hasAny(anyPermissions)) {
    isAllowed = false;
  }

  if (allPermissions && !hasAll(allPermissions)) {
    isAllowed = false;
  }

  if (!isAllowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
