import { 
  Plus, 
  RefreshCw, 
  Upload, 
  QrCode, 
  ClipboardList, 
  AlertTriangle, 
  Shield, 
  Megaphone,
  type LucideIcon 
} from 'lucide-react';
import type { QuickActionProfileKey } from '../experiences/experience.types';

export interface QuickActionItem {
  label: string;
  icon: LucideIcon;
  action: string;
}

export const QUICK_ACTION_REGISTRY: Record<QuickActionProfileKey, QuickActionItem[]> = {
  FLEET: [
    { label: 'Restart Device', icon: RefreshCw, action: 'device_restart' },
    { label: 'Create Ticket', icon: Plus, action: 'create_ticket' },
  ],
  TECHNICIAN: [
    { label: 'Scan QR', icon: QrCode, action: 'scan_qr' },
    { label: 'Open Job Queue', icon: ClipboardList, action: 'open_job' },
  ],
  OWNER: [
    { label: 'Add Device', icon: Plus, action: 'add_device' },
    { label: 'New Campaign', icon: Megaphone, action: 'new_campaign' },
  ],
  ADVERTISER: [
    { label: 'New Campaign', icon: Plus, action: 'new_campaign' },
    { label: 'Upload Creative', icon: Upload, action: 'upload_creative' },
  ],
  CONTENT: [
    { label: 'Upload Media', icon: Upload, action: 'upload_media' },
    { label: 'New Playlist', icon: Plus, action: 'new_playlist' },
  ],
  DRIVER: [
    { label: 'Report Problem', icon: AlertTriangle, action: 'report_problem' },
  ],
  SUPPORT: [
    { label: 'Open Ticket', icon: Plus, action: 'open_ticket' },
    { label: 'Remote Restart', icon: RefreshCw, action: 'device_restart' },
  ],
  PLATFORM: [
    { label: 'New Organization', icon: Plus, action: 'new_org' },
    { label: 'Adjust License', icon: Shield, action: 'adjust_license' },
  ],
};
