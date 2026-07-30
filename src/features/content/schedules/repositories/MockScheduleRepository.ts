import { mockContentStore } from '../../data/MockContentStore';
import type { ScheduleRule } from '../../data/types';

export interface IScheduleRepository {
  getSchedules(): Promise<ScheduleRule[]>;
  saveSchedule(schedule: ScheduleRule): Promise<ScheduleRule>;
  deleteSchedule(id: string): Promise<void>;
}

export class MockScheduleRepository implements IScheduleRepository {
  private simulateLatency(ms: number = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getSchedules(): Promise<ScheduleRule[]> {
    await this.simulateLatency();
    return [...mockContentStore.schedules];
  }

  async saveSchedule(schedule: ScheduleRule): Promise<ScheduleRule> {
    await this.simulateLatency();
    const idx = mockContentStore.schedules.findIndex(s => s.id === schedule.id);
    if (idx >= 0) {
      mockContentStore.schedules[idx] = JSON.parse(JSON.stringify(schedule));
    } else {
      mockContentStore.schedules.unshift(JSON.parse(JSON.stringify(schedule)));
    }
    return schedule;
  }

  async deleteSchedule(id: string): Promise<void> {
    await this.simulateLatency();
    mockContentStore.schedules = mockContentStore.schedules.filter(s => s.id !== id);
  }
}

export const scheduleRepository = new MockScheduleRepository();
