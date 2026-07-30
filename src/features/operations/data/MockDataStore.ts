import { generateMockDevices } from '../devices/repositories/DeviceFactory';
import type { Device } from '../devices/types';

// Types for Alerts
export type AlertStatus = 'open' | 'acknowledged' | 'resolved';
export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  message: string;
  severity: AlertSeverity;
  status: AlertStatus;
  timestamp: string;
}

// Types for Deployments
export type DeploymentState = 'queued' | 'preparing' | 'deploying' | 'verifying' | 'completed' | 'failed';

export interface Deployment {
  id: string;
  name: string;
  targetCount: number;
  completedCount: number;
  state: DeploymentState;
  startTime: string;
  createdBy: string;
}

class MockDataStore {
  public devices: Device[] = [];
  public alerts: Alert[] = [];
  public deployments: Deployment[] = [];

  constructor() {
    this.initializeData(1000); // Stage 3: 1000 devices
  }

  private initializeData(deviceCount: number) {
    this.devices = generateMockDevices(deviceCount);

    // Generate Relational Alerts
    let alertCounter = 1;
    this.devices.forEach(device => {
      if (device.status === 'offline') {
        this.alerts.push({
          id: `al_${alertCounter++}`,
          deviceId: device.id,
          deviceName: device.name,
          message: 'Device stopped heartbeating',
          severity: 'critical',
          status: Math.random() > 0.5 ? 'open' : 'acknowledged',
          timestamp: device.lastSeen,
        });
      } else if (device.status === 'warning') {
        this.alerts.push({
          id: `al_${alertCounter++}`,
          deviceId: device.id,
          deviceName: device.name,
          message: 'High CPU/Memory usage detected',
          severity: 'warning',
          status: 'open',
          timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(), // within last hour
        });
      }
    });

    // Add some resolved alerts for realism
    for (let i = 0; i < 50; i++) {
      const device = this.devices[Math.floor(Math.random() * this.devices.length)];
      this.alerts.push({
        id: `al_${alertCounter++}`,
        deviceId: device.id,
        deviceName: device.name,
        message: 'Content sync completed',
        severity: 'info',
        status: 'resolved',
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(), // within last 24h
      });
    }

    // Sort alerts descending by timestamp
    this.alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Generate Deployments targeting groups
    this.deployments = [
      {
        id: 'dep_102',
        name: 'v2.4.2 Global Rollout',
        targetCount: 1000,
        completedCount: 450,
        state: 'deploying',
        startTime: new Date(Date.now() - 1800000).toISOString(),
        createdBy: 'Alice Admin'
      },
      {
        id: 'dep_103',
        name: 'Hotfix: North Wing Displays',
        targetCount: this.devices.filter(d => d.groupName === 'North Wing Displays').length,
        completedCount: 0,
        state: 'queued',
        startTime: new Date(Date.now() - 300000).toISOString(),
        createdBy: 'Bob Ops'
      },
      {
        id: 'dep_101',
        name: 'v2.4.1 Rollout',
        targetCount: 1000,
        completedCount: 980,
        state: 'completed',
        startTime: new Date(Date.now() - 86400000).toISOString(),
        createdBy: 'System'
      }
    ];
  }
}

export const mockStore = new MockDataStore();
