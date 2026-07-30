import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MonitorSmartphone, Activity, FileText, DownloadCloud, Image as ImageIcon, Settings, Clock, RefreshCw, Trash, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/shared/icons/Icon';
import { Tabs } from '@/shared/components/navigation/Tabs';
import { Breadcrumb } from '@/shared/components/navigation/Breadcrumb';
import { StatusIndicator } from '@/shared/components/data-display/StatusIndicator';
import { KPICard } from '@/shared/components/data-display/KPICard';
import { LoadingSkeleton } from '@/shared/components/data-display/LoadingSkeleton';
import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { deviceRepository } from '../repositories/MockDeviceRepository';
import { DeviceFormDrawer } from '../components/DeviceFormDrawer';
import type { Device } from '../types';

export function DeviceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchDevice = async () => {
    try {
      setLoading(true);
      if (!id) throw new Error('No device ID provided');
      const data = await deviceRepository.getById(id);
      if (!data) throw new Error('Device not found');
      setDevice(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevice();
  }, [id]);

  if (loading) {
    return <div className="p-8"><LoadingSkeleton type="card" /></div>;
  }

  if (error || !device) {
    return <div className="p-8"><ErrorState onRetry={() => navigate('/dashboard/operations/devices')} /></div>;
  }

  return (
    <div className="h-full flex flex-col space-y-6 max-w-6xl mx-auto w-full">
      {/* Navigation & Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Breadcrumb items={[
            { label: 'Operations', href: '/dashboard/operations' },
            { label: 'Devices', href: '/dashboard/operations/devices' },
            { label: device.name }
          ]} />
          <div className="flex items-center gap-2">
            <PermissionGate required={Permission.DEVICES.COMMAND}>
              <Button variant="secondary" size="sm">
                <Icon icon={RefreshCw} size="sm" className="mr-2" />
                Restart
              </Button>
            </PermissionGate>
            <PermissionGate required={Permission.DEVICES.UPDATE}>
              <Button variant="secondary" size="sm" onClick={() => setIsDrawerOpen(true)}>
                <Icon icon={Edit} size="sm" className="mr-2" />
                Edit
              </Button>
            </PermissionGate>
            <PermissionGate required={Permission.DEVICES.DELETE}>
              <Button variant="destructive" size="sm">
                <Icon icon={Trash} size="sm" className="mr-2" />
                Delete
              </Button>
            </PermissionGate>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-level-1)]">
          <div className="p-4 bg-[var(--color-background)] rounded-full text-[var(--color-text-secondary)]">
            <Icon icon={MonitorSmartphone} size="xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{device.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <StatusIndicator status={device.status} label={device.status} />
              <span className="text-sm text-[var(--color-text-muted)]">•</span>
              <span className="text-sm text-[var(--color-text-secondary)]">{device.id}</span>
              <span className="text-sm text-[var(--color-text-muted)]">•</span>
              <span className="text-sm text-[var(--color-text-secondary)]">{device.organizationName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex-1 min-h-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-level-1)] p-6">
        <Tabs defaultValue="overview">
          <Tabs.List variant="underline">
            <Tabs.Trigger value="overview"><span className="flex items-center gap-2"><Icon icon={Activity} size="sm" /> Overview</span></Tabs.Trigger>
            <Tabs.Trigger value="health"><span className="flex items-center gap-2"><Icon icon={Activity} size="sm" /> Health</span></Tabs.Trigger>
            <Tabs.Trigger value="logs"><span className="flex items-center gap-2"><Icon icon={FileText} size="sm" /> Logs</span></Tabs.Trigger>
            <Tabs.Trigger value="deployments"><span className="flex items-center gap-2"><Icon icon={DownloadCloud} size="sm" /> Deployments</span></Tabs.Trigger>
            <Tabs.Trigger value="screenshots"><span className="flex items-center gap-2"><Icon icon={ImageIcon} size="sm" /> Screenshots</span></Tabs.Trigger>
            <Tabs.Trigger value="configuration"><span className="flex items-center gap-2"><Icon icon={Settings} size="sm" /> Config</span></Tabs.Trigger>
            <Tabs.Trigger value="activity"><span className="flex items-center gap-2"><Icon icon={Clock} size="sm" /> Activity</span></Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <KPICard title="Model" value={device.hardwareModel} />
              <KPICard title="Firmware" value={device.firmwareVersion} />
              <KPICard title="Resolution" value={device.resolution} />
              <KPICard title="Location" value={`${device.location.city}, ${device.location.country}`} />
            </div>
          </Tabs.Content>
          
          <Tabs.Content value="health">
            <div className="mt-6 flex items-center justify-center h-48 border border-dashed rounded-lg text-[var(--color-text-muted)]">Health Charts Placeholder</div>
          </Tabs.Content>
          <Tabs.Content value="logs">
            <div className="mt-6 flex items-center justify-center h-48 border border-dashed rounded-lg text-[var(--color-text-muted)]">Device Logs Placeholder</div>
          </Tabs.Content>
          <Tabs.Content value="deployments">
            <div className="mt-6 flex items-center justify-center h-48 border border-dashed rounded-lg text-[var(--color-text-muted)]">Deployments History Placeholder</div>
          </Tabs.Content>
          <Tabs.Content value="screenshots">
            <div className="mt-6 flex items-center justify-center h-48 border border-dashed rounded-lg text-[var(--color-text-muted)]">Screenshots Placeholder</div>
          </Tabs.Content>
          <Tabs.Content value="configuration">
            <div className="mt-6 flex items-center justify-center h-48 border border-dashed rounded-lg text-[var(--color-text-muted)]">Configuration Placeholder</div>
          </Tabs.Content>
          <Tabs.Content value="activity">
            <div className="mt-6 flex items-center justify-center h-48 border border-dashed rounded-lg text-[var(--color-text-muted)]">Activity Feed Placeholder</div>
          </Tabs.Content>
        </Tabs>
      </div>

      <DeviceFormDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        device={device}
        onSubmit={async (formData) => {
          await deviceRepository.update(device.id, formData as any);
          fetchDevice();
        }}
      />
    </div>
  );
}
