import React, { createContext, useContext, useState } from 'react';

export interface OrganizationInfo {
  id: string;
  name: string;
  type: string;
}

export const MOCK_ORGANIZATIONS: OrganizationInfo[] = [
  { id: 'org_acme', name: 'Acme Enterprise Corp', type: 'Enterprise Production' },
  { id: 'org_demo', name: 'TrotOS Demo Sandbox', type: 'Sandbox Environment' },
  { id: 'org_retail', name: 'Retail Fleet North America', type: 'Regional Fleet' },
];

interface OrganizationContextType {
  currentOrg: OrganizationInfo;
  availableOrgs: OrganizationInfo[];
  switchOrganization: (orgId: string) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentOrg, setCurrentOrg] = useState<OrganizationInfo>(MOCK_ORGANIZATIONS[0]);

  const switchOrganization = (orgId: string) => {
    const target = MOCK_ORGANIZATIONS.find((o) => o.id === orgId);
    if (target) {
      setCurrentOrg(target);
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        currentOrg,
        availableOrgs: MOCK_ORGANIZATIONS,
        switchOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};
