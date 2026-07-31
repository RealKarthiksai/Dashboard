import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { usePermission } from '../authorization/PermissionContext';
import { 
  ROLE_DEFAULT_WORKSPACE, 
  WORKSPACE_DEFINITIONS, 
  type WorkspaceId, 
  type WorkspaceConfig 
} from './workspace.types';

interface WorkspaceContextType {
  activeWorkspace: WorkspaceId;
  setWorkspace: (ws: WorkspaceId) => void;
  workspaceConfig: WorkspaceConfig;
  availableWorkspaces: WorkspaceConfig[];
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { currentRole } = usePermission();

  const defaultWs = useMemo(() => ROLE_DEFAULT_WORKSPACE[currentRole] || 'OWNER', [currentRole]);
  const [activeWorkspace, setWorkspace] = useState<WorkspaceId>(defaultWs);

  // Sync default workspace when role changes in simulator or auth
  useEffect(() => {
    setWorkspace(ROLE_DEFAULT_WORKSPACE[currentRole] || 'OWNER');
  }, [currentRole]);

  const workspaceConfig = useMemo(() => WORKSPACE_DEFINITIONS[activeWorkspace], [activeWorkspace]);
  const availableWorkspaces = useMemo(() => Object.values(WORKSPACE_DEFINITIONS), []);

  return (
    <WorkspaceContext.Provider
      value={{
        activeWorkspace,
        setWorkspace,
        workspaceConfig,
        availableWorkspaces,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
