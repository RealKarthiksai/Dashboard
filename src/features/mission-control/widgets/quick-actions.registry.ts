import { Send, RefreshCw, UploadCloud, PlusCircle, type LucideIcon } from 'lucide-react';
import { Permission, type PermissionKey } from '@/core/authorization/permissions';

export interface QuickActionItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  path: string;
  permission?: PermissionKey;
  primary?: boolean;
}

export const QUICK_ACTIONS_REGISTRY: QuickActionItem[] = [
  {
    id: 'deploy-content',
    label: 'Deploy Content',
    description: 'Publish playlists or campaigns to displays',
    icon: Send,
    path: '/dashboard/content/schedules',
    permission: Permission.CONTENT.UPDATE,
    primary: true,
  },
  {
    id: 'restart-device',
    label: 'Restart Device',
    description: 'Trigger remote reboot command',
    icon: RefreshCw,
    path: '/dashboard/operations/devices',
    permission: Permission.DEVICES.COMMAND,
    primary: false,
  },
  {
    id: 'upload-media',
    label: 'Upload Media',
    description: 'Add new video or image assets',
    icon: UploadCloud,
    path: '/dashboard/content/media',
    permission: Permission.CONTENT.CREATE,
    primary: false,
  },
  {
    id: 'create-playlist',
    label: 'Create Playlist',
    description: 'Assemble media sequence',
    icon: PlusCircle,
    path: '/dashboard/content/playlists',
    permission: Permission.CONTENT.CREATE,
    primary: false,
  },
];
