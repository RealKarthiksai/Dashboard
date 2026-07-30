import { useState, useEffect, useCallback } from 'react';
import { scheduleRepository } from '../repositories/MockScheduleRepository';
import type { ScheduleRule } from '../../data/types';

export function useSchedules() {
  const [data, setData] = useState<ScheduleRule[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    try {
      const response = await scheduleRepository.getSchedules();
      setData(response);
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const deleteSchedule = async (id: string) => {
    await scheduleRepository.deleteSchedule(id);
    await fetchSchedules();
  };

  const toggleStatus = async (schedule: ScheduleRule) => {
    const newStatus = schedule.status === 'active' ? 'draft' : 'active';
    await scheduleRepository.saveSchedule({ ...schedule, status: newStatus });
    await fetchSchedules();
  };

  return {
    data,
    loading,
    refresh: fetchSchedules,
    deleteSchedule,
    toggleStatus
  };
}
