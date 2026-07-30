import { useState, useEffect } from 'react';
import { Drawer } from '@/shared/components/overlays/Drawer';
import { FormField } from '@/shared/components/forms/FormField';
import { Input } from '@/shared/components/forms/Input';
import { Select } from '@/shared/components/forms/Select';
import { Button } from '@/components/ui/Button';
import type { DeviceCreateDTO, Device } from '../types';

export interface DeviceFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  device?: Device; // If provided, we are in Edit mode
  onSubmit: (data: Partial<DeviceCreateDTO>) => Promise<void>;
}

export function DeviceFormDrawer({ isOpen, onClose, device, onSubmit }: DeviceFormDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<DeviceCreateDTO>>({});

  useEffect(() => {
    if (isOpen) {
      if (device) {
        setFormData({
          name: device.name,
          organizationId: device.organizationId,
          groupId: device.groupId,
          hardwareModel: device.hardwareModel,
          resolution: device.resolution,
          orientation: device.orientation,
          location: device.location,
        });
      } else {
        setFormData({
          name: '',
          organizationId: '',
          hardwareModel: 'Trot-X1',
          resolution: '1920x1080',
          orientation: 'landscape',
          location: { city: '', country: '', timezone: 'UTC' }
        });
      }
    }
  }, [isOpen, device]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" size="md">
      <Drawer.Header>
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
          {device ? 'Edit Device' : 'Register New Device'}
        </h2>
      </Drawer.Header>
      
      <Drawer.Body>
        <div className="space-y-6">
          <FormField label="Device Name" required>
            <Input 
              value={formData.name || ''} 
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Kiosk-A1"
            />
          </FormField>
          
          <FormField label="Organization" required>
            <Select 
              value={formData.organizationId || ''}
              onChange={e => setFormData({ ...formData, organizationId: e.target.value })}
            >
              <option value="" disabled>Select Organization</option>
              <option value="org_1">Acme Corp</option>
              <option value="org_2">Global Retail</option>
              <option value="org_3">Transit Authority</option>
            </Select>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Hardware Model" required>
              <Select 
                value={formData.hardwareModel || ''}
                onChange={e => setFormData({ ...formData, hardwareModel: e.target.value })}
              >
                <option value="Trot-X1">Trot-X1</option>
                <option value="Trot-Pro-Display">Trot-Pro-Display</option>
                <option value="Kiosk-V2">Kiosk-V2</option>
              </Select>
            </FormField>

            <FormField label="Orientation" required>
              <Select 
                value={formData.orientation || ''}
                onChange={e => setFormData({ ...formData, orientation: e.target.value as any })}
              >
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
              </Select>
            </FormField>
          </div>

          <FormField label="Location (City)" required>
            <Input 
              value={formData.location?.city || ''} 
              onChange={e => setFormData({ ...formData, location: { ...formData.location!, city: e.target.value } })}
              placeholder="e.g. New York"
            />
          </FormField>
          
          <FormField label="Location (Country)" required>
            <Input 
              value={formData.location?.country || ''} 
              onChange={e => setFormData({ ...formData, location: { ...formData.location!, country: e.target.value } })}
              placeholder="e.g. USA"
            />
          </FormField>
        </div>
      </Drawer.Body>
      
      <Drawer.Footer>
        <div className="flex gap-3 w-full">
          <div className="flex-1 flex"><Button variant="secondary" onClick={onClose} className="w-full justify-center">Cancel</Button></div>
          <div className="flex-1 flex"><Button onClick={handleSubmit} disabled={loading} className="w-full justify-center">
            {device ? 'Save Changes' : 'Register Device'}
          </Button></div>
        </div>
      </Drawer.Footer>
    </Drawer>
  );
}
