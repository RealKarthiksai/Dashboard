import { AlertTriangle, Clock, RefreshCw, Megaphone, CreditCard, type LucideIcon } from 'lucide-react';
import { Permission, type PermissionKey } from '../authorization/permissions';

export interface NotificationCategoryItem {
  id: string;
  title: string;
  message: string;
  time: string;
  category: 'Operations' | 'Content' | 'Campaigns' | 'Billing';
  permission?: PermissionKey;
  priority: 'high' | 'medium' | 'low';
  icon: LucideIcon;
  unread: boolean;
}

export const NOTIFICATION_REGISTRY: NotificationCategoryItem[] = [
  {
    id: 'notif_1',
    title: 'Screen 104 Disconnected',
    message: 'London Heathrow Terminal 2 lost connection 12m ago.',
    time: '12m ago',
    category: 'Operations',
    permission: Permission.DEVICES.READ,
    priority: 'high',
    icon: AlertTriangle,
    unread: true,
  },
  {
    id: 'notif_2',
    title: 'Firmware Update Ready',
    message: 'v2.4 ready for 24 regional displays.',
    time: '45m ago',
    category: 'Operations',
    permission: Permission.DEVICES.COMMAND,
    priority: 'medium',
    icon: RefreshCw,
    unread: true,
  },
  {
    id: 'notif_3',
    title: 'Campaign Expiring Soon',
    message: 'Summer Sale campaign ends in 2 hours.',
    time: '1h ago',
    category: 'Campaigns',
    permission: Permission.CAMPAIGNS.READ,
    priority: 'medium',
    icon: Megaphone,
    unread: false,
  },
  {
    id: 'notif_4',
    title: 'Invoice Statement Available',
    message: 'Monthly usage invoice for July is generated.',
    time: '3h ago',
    category: 'Billing',
    permission: Permission.BILLING.READ,
    priority: 'low',
    icon: CreditCard,
    unread: false,
  },
  {
    id: 'notif_5',
    title: 'Content License Renewal',
    message: 'Getty Images license expires in 5 days.',
    time: '5h ago',
    category: 'Content',
    permission: Permission.CONTENT.READ,
    priority: 'medium',
    icon: Clock,
    unread: false,
  },
];
