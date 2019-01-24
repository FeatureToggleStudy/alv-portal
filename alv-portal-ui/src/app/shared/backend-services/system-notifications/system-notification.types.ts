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
