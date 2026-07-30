import { useState } from 'react';

import { Button } from '@/components/ui/Button';

import { DataTable } from '@/shared/components/data-display/DataTable';
import { EmptyState } from '@/shared/components/data-display/EmptyState';
import { KPICard } from '@/shared/components/data-display/KPICard';
import { StatusIndicator } from '@/shared/components/data-display/StatusIndicator';
import { LoadingSkeleton } from '@/shared/components/data-display/LoadingSkeleton';
import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { Banner } from '@/shared/components/feedback/Banner';
import { InlineAlert } from '@/shared/components/feedback/InlineAlert';
import { Toast } from '@/shared/components/feedback/Toast';
import { Spinner } from '@/shared/components/indicators/Spinner';
import { ProgressBar } from '@/shared/components/indicators/ProgressBar';
import { ProgressRing } from '@/shared/components/indicators/ProgressRing';
import { Badge } from '@/shared/components/indicators/Badge';
import { BadgeGroup } from '@/shared/components/indicators/BadgeGroup';
import { Input } from '@/shared/components/forms/Input';
import { FormField } from '@/shared/components/forms/FormField';
import { Textarea } from '@/shared/components/forms/Textarea';
import { Switch } from '@/shared/components/forms/Switch';
import { Select } from '@/shared/components/forms/Select';
import { MultiSelect } from '@/shared/components/forms/MultiSelect';
import { Tabs } from '@/shared/components/navigation/Tabs';
import { SegmentedControl } from '@/shared/components/navigation/SegmentedControl';
import { Breadcrumb } from '@/shared/components/navigation/Breadcrumb';

import { SearchInput } from '@/shared/components/search/SearchInput';
import { FilterBar } from '@/shared/components/search/FilterBar';
import { FilterChip } from '@/shared/components/search/FilterChip';
import { Modal } from '@/shared/components/overlays/Modal';
import { Drawer } from '@/shared/components/overlays/Drawer';
import { Popover } from '@/shared/components/overlays/Popover';
import { Tooltip } from '@/shared/components/overlays/Tooltip';
import { ContextMenu } from '@/shared/components/overlays/ContextMenu';
import { useTheme } from '@/context/ThemeContext';

export function ComponentSandbox() {
  const { toggleTheme } = useTheme();
  
  // State for interactive components
  const [switchOn, setSwitchOn] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [segmentedValue, setSegmentedValue] = useState('list');
  const [page, setPage] = useState(1);
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] p-8 pb-32">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="flex items-center justify-between pb-6 border-b border-[var(--color-border)]">
          <div>
            <h1 className="text-3xl font-bold">Design System Sandbox</h1>
            <p className="text-[var(--color-text-secondary)] mt-2">Test and interact with all shared UI primitives.</p>
          </div>
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </header>

        {/* --- INDICATORS --- */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b border-[var(--color-border)] pb-2">1. Indicators</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Spinners</h3>
              <div className="flex items-center gap-6 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
                <Spinner size="sm" />
                <Spinner size="md" variant="success" />
                <Spinner size="lg" variant="danger" />
                <Spinner label="Loading data..." />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Progress Rings</h3>
              <div className="flex items-center gap-6 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
                <ProgressRing value={25} size={48} strokeWidth={4} />
                <ProgressRing value={65} variant="warning" />
                <ProgressRing value={100} variant="success" size={80} strokeWidth={8} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Progress Bars</h3>
              <div className="space-y-4 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
                <ProgressBar value={40} showLabel />
                <ProgressBar value={75} variant="success" size="sm" />
                <ProgressBar value={90} variant="danger" size="lg" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Badges & Groups</h3>
              <div className="space-y-4 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
                <div className="flex gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                </div>
                <BadgeGroup max={2}>
                  <Badge variant="info">Tag 1</Badge>
                  <Badge variant="info">Tag 2</Badge>
                  <Badge variant="info">Tag 3</Badge>
                  <Badge variant="info">Tag 4</Badge>
                </BadgeGroup>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEEDBACK --- */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b border-[var(--color-border)] pb-2">2. Feedback</h2>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Banners & Toasts</h3>
            <div className="flex flex-col gap-4">
              {bannerVisible && (
                <Banner 
                  title="System Maintenance" 
                  description="We will be undergoing maintenance on Saturday at 2:00 AM UTC." 
                  variant="warning"
                  onDismiss={() => setBannerVisible(false)}
                />
              )}
              <div className="flex gap-4">
                <Toast title="Success!" description="Your changes have been saved." variant="success" />
                <Toast title="Connection Error" description="Could not reach the server." variant="danger" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Inline Alerts</h3>
              <div className="space-y-4 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
                <InlineAlert title="Update Available" description="A new version of TrotOS is ready to install." variant="info" />
                <InlineAlert title="Missing Permissions" description="You do not have access to modify these settings." variant="danger" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Error State</h3>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden">
                <ErrorState onRetry={() => {}} />
              </div>
            </div>
          </div>
        </section>

        {/* --- FORMS --- */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b border-[var(--color-border)] pb-2">3. Forms</h2>
          
          <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <FormField label="Email Address" required description="We'll never share your email.">
                  <Input placeholder="jane@example.com" />
                </FormField>
                
                <FormField label="Password" error="Password is too short.">
                  <Input type="password" variant="error" defaultValue="123" />
                </FormField>

                <FormField label="Bio">
                  <Textarea placeholder="Tell us about yourself..." />
                </FormField>
              </div>

              <div className="space-y-6">
                <FormField label="Role">
                  <Select>
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </Select>
                </FormField>

                <FormField label="Locations">
                  <MultiSelect 
                    options={[
                      { label: 'New York', value: 'nyc' },
                      { label: 'London', value: 'lon' },
                      { label: 'Tokyo', value: 'tok' }
                    ]}
                    selected={multiSelected}
                    onChange={setMultiSelected}
                  />
                </FormField>

                <div className="flex items-center gap-4">
                  <Switch checked={switchOn} onChange={(e) => setSwitchOn(e.target.checked)} />
                  <span className="text-sm">Enable Notifications</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- NAVIGATION --- */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b border-[var(--color-border)] pb-2">4. Navigation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Tabs (Compound Component)</h3>
              <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
                <Tabs defaultValue="account">
                  <Tabs.List>
                    <Tabs.Trigger value="account">Account</Tabs.Trigger>
                    <Tabs.Trigger value="password">Password</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="account"><div className="p-4 border rounded-md border-dashed">Account Settings Content</div></Tabs.Content>
                  <Tabs.Content value="password"><div className="p-4 border rounded-md border-dashed">Password Content</div></Tabs.Content>
                  <Tabs.Content value="settings"><div className="p-4 border rounded-md border-dashed">General Settings Content</div></Tabs.Content>
                </Tabs>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Breadcrumb</h3>
                <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
                  <Breadcrumb items={[
                    { label: 'Settings', href: '#' },
                    { label: 'Team', href: '#' },
                    { label: 'Members' },
                  ]} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Segmented Control</h3>
                <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
                  <SegmentedControl 
                    value={segmentedValue}
                    onChange={setSegmentedValue}
                    fullWidth
                    options={[
                      { label: 'List View', value: 'list' },
                      { label: 'Grid View', value: 'grid' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SEARCH & OVERLAYS --- */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b border-[var(--color-border)] pb-2">5. Search & Overlays</h2>
          
          <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
            <FilterBar 
              search={
                <SearchInput 
                  placeholder="Search devices..." 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClear={() => setSearchValue('')}
                />
              }
              actions={
                <>
                  <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
                  <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                </>
              }
              activeFilters={[
                <FilterChip key="1" label="Status" value="Online" onRemove={() => {}} />,
                <FilterChip key="2" label="Location" value="New York" onRemove={() => {}} />
              ]}
              onClearFilters={() => {}}
            />
            
            <div className="mt-8 flex gap-8 items-center justify-center p-12 border border-dashed border-[var(--color-border)] rounded-md">
              <Tooltip content="This is a helpful tooltip">
                <span className="underline decoration-dashed cursor-help">Hover me for Tooltip</span>
              </Tooltip>
              
              <Popover 
                trigger={<Button variant="secondary">Click for Popover</Button>}
                content={<div className="p-2 text-sm text-[var(--color-text-secondary)]">I am a floating popover card. Perfect for mini-forms or deep filters.</div>}
              />
              
              <ContextMenu 
                items={[
                  { label: 'Edit', onClick: () => {} },
                  { label: 'Duplicate', onClick: () => {} },
                  { label: 'Delete', danger: true, onClick: () => {} },
                ]}
              >
                <div className="p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md cursor-context-menu text-sm">
                  Right-click me for Context Menu
                </div>
              </ContextMenu>
            </div>
          </div>
        </section>

        {/* --- DATA DISPLAY --- */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b border-[var(--color-border)] pb-2">6. Data Display</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <KPICard title="Total Revenue" value="$42,500" trend={{ direction: 'up', value: '12%' }} />
            <KPICard title="Active Screens" value="1,204" trend={{ direction: 'neutral', value: '0%' }} />
            <KPICard title="Error Rate" value="3.4%" trend={{ direction: 'down', value: '1.2%' }} />
          </div>
          
          <h3 className="text-sm font-semibold">DataTable</h3>
          <DataTable 
            data={[
              { id: '1', name: 'Terminal A Display', status: 'online', role: 'Main' },
              { id: '2', name: 'Gate B4 Kiosk', status: 'offline', role: 'Interactive' },
              { id: '3', name: 'Lounge Screen', status: 'warning', role: 'Main' },
            ]}
            columns={[
              { header: 'Display Name', accessorKey: 'name', sortable: true },
              { header: 'Role', accessorKey: 'role' },
              { 
                header: 'Status', 
                cell: (row) => <StatusIndicator status={row.status as any} label={row.status} />
              },
            ]}
            keyExtractor={(row) => row.id}
            currentPage={page}
            totalPages={5}
            onPageChange={setPage}
            sortColumn="name"
            sortDirection="asc"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Empty State</h3>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
                <EmptyState title="No active campaigns" description="Create a new campaign to get started." />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Loading Skeleton</h3>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-4">
                <LoadingSkeleton type="card" />
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Render Overlays at the root */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          <h2 className="text-lg font-bold">Create New Device</h2>
        </Modal.Header>
        <Modal.Body>
          <p className="text-[var(--color-text-secondary)]">This modal traps focus and can be closed with the Escape key or the X button.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsModalOpen(false)}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} position="right">
        <Drawer.Header>
          <h2 className="text-lg font-bold">Filters</h2>
        </Drawer.Header>
        <Drawer.Body>
          <p className="text-[var(--color-text-secondary)]">Drawer content goes here. Also traps focus and handles Escape.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <div className="w-full flex"><Button variant="secondary" onClick={() => setIsDrawerOpen(false)} className="w-full">Apply Filters</Button></div>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
}
