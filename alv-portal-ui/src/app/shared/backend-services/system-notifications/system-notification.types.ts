import { now, toISOLocalDateTime } from '../../forms/input/ngb-date-utils';

export interface SystemNotificationDto {
  id: string;
  title: string;
  text_de: string;
  text_fr: string;
  text_it: string;
  text_en: string;
  type: SystemNotificationType;
  startDate: string;
  endDate: string;
  active: boolean;
}

export enum SystemNotificationType {
  INTERRUPTION = 'interruption',
  MAINTENANCE = 'maintenance',
  SYSTEMERROR = 'systemerror'
}

export function empty(): SystemNotificationDto {
  return {
    id: null,
    title: '',
    text_de: '',
    text_fr: '',
    text_it: '',
    text_en: '',
    type: null,
    startDate: toISOLocalDateTime(now(), '0', '0'),
    endDate: toISOLocalDateTime(now(), '0', '0'),
    active: false
  };
}
