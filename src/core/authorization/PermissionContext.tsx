import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PermissionKey } from './permissions';
import { ROLE_TEMPLATES, type RoleName } from './roles/templates';

interface PermissionContextType {
  userPermissions: PermissionKey[];
  currentRole: RoleName;
  setRole: (role: RoleName) => void;
  can: (permission: PermissionKey) => boolean;
  cannot: (permission: PermissionKey) => boolean;
  hasAny: (permissions: PermissionKey[]) => boolean;
  hasAll: (permissions: PermissionKey[]) => boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export function PermissionProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<RoleName>('Organization_Owner');
  const [userPermissions, setUserPermissions] = useState<PermissionKey[]>(
    ROLE_TEMPLATES['Organization_Owner']
  );

  const setRole = (role: RoleName) => {
    setCurrentRole(role);
    setUserPermissions(ROLE_TEMPLATES[role] || []);
  };

  const can = (permission: PermissionKey): boolean => {
    return userPermissions.includes(permission);
  };

  const cannot = (permission: PermissionKey): boolean => {
    return !can(permission);
  };

  const hasAny = (permissions: PermissionKey[]): boolean => {
    return permissions.some((p) => can(p));
  };

  const hasAll = (permissions: PermissionKey[]): boolean => {
    return permissions.every((p) => can(p));
  };

  return (
    <PermissionContext.Provider
      value={{
        userPermissions,
        currentRole,
        setRole,
        can,
        cannot,
        hasAny,
        hasAll,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermission() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermission must be used within a PermissionProvider');
  }
  return context;
}
