import React, { useEffect, useState } from 'react';
import { adminRepository } from '../../repositories/AdminRepository';
import type { OrganizationSettings } from '../../data/types';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { Building2, ShieldCheck, Globe, Save, Check } from 'lucide-react';
import { useOrganization } from '../context/OrganizationContext';

export const OrganizationSettingsPage: React.FC = () => {
  const { currentOrg } = useOrganization();
  const [settings, setSettings] = useState<OrganizationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const fetchOrg = async () => {
      setLoading(true);
      const data = await adminRepository.getOrganization();
      setSettings(data);
      setLoading(false);
    };
    fetchOrg();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    await adminRepository.updateOrganization(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <PermissionGate required={Permission.USERS.READ}>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Organization Settings</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Configure tenant profile specs, single sign-on (SSO) authentication, and security policies.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold text-xs border border-[var(--color-primary)]/20">
            <Building2 className="w-4 h-4" />
            Active Tenant: {currentOrg.name}
          </div>
        </div>

        {loading || !settings ? (
          <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)]">
            Loading tenant settings...
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            {/* General Profile */}
            <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] space-y-4">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[var(--color-primary)]" />
                Tenant Profile & Regional Spec
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                    Corporate Domain
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.domain}
                    onChange={(e) => setSettings({ ...settings, domain: e.target.value })}
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                    System Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="America/New_York (UTC-5)">America/New_York (UTC-5)</option>
                    <option value="America/Los_Angeles (UTC-8)">America/Los_Angeles (UTC-8)</option>
                    <option value="Europe/London (UTC+0)">Europe/London (UTC+0)</option>
                    <option value="Asia/Tokyo (UTC+9)">Asia/Tokyo (UTC+9)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                    Environment Type
                  </label>
                  <input
                    type="text"
                    disabled
                    value={settings.type}
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-muted)] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SSO & Security Policies */}
            <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] space-y-4">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                SSO Identity & Security Enforcement
              </h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] cursor-pointer text-sm font-medium text-[var(--color-text-primary)]">
                  <input
                    type="checkbox"
                    checked={settings.ssoEnabled}
                    onChange={(e) => setSettings({ ...settings, ssoEnabled: e.target.checked })}
                    className="rounded accent-[var(--color-primary)]"
                  />
                  Enforce Single Sign-On (SSO / SAML 2.0)
                </label>

                {settings.ssoEnabled && (
                  <div className="pl-6 border-l-2 border-[var(--color-primary)] space-y-3">
                    <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase">
                      SSO Identity Provider
                    </label>
                    <select
                      value={settings.ssoProvider || 'Okta'}
                      onChange={(e) => setSettings({ ...settings, ssoProvider: e.target.value as any })}
                      className="w-full md:w-64 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                    >
                      <option value="Okta">Okta Enterprise</option>
                      <option value="Azure AD">Microsoft Azure AD / Entra ID</option>
                      <option value="Google Workspace">Google Workspace Enterprise</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] cursor-pointer text-sm font-medium text-[var(--color-text-primary)]">
                    <input
                      type="checkbox"
                      checked={settings.securityPolicy.requireMfa}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          securityPolicy: {
                            ...settings.securityPolicy,
                            requireMfa: e.target.checked,
                          },
                        })
                      }
                      className="rounded accent-[var(--color-primary)]"
                    />
                    Require Mandatory Multi-Factor Auth (MFA)
                  </label>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                      Session Inactivity Timeout (Minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.securityPolicy.sessionTimeoutMinutes}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          securityPolicy: {
                            ...settings.securityPolicy,
                            sessionTimeoutMinutes: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-4">
              {savedSuccess && (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-500">
                  <Check className="w-4 h-4" /> Settings Saved!
                </span>
              )}
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <Save className="w-4 h-4" />
                Save Organization Settings
              </button>
            </div>
          </form>
        )}
      </div>
    </PermissionGate>
  );
};
