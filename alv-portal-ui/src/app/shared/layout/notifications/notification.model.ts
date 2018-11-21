export interface Notification {
  id?: number;
  type: NotificationType;
  messageKey: string;
  isSticky: boolean;
}

export enum NotificationType {
  DEFAULT = 'default',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}
