export interface Notification {
  id?: number;
  type: NotificationType;
  messageKey: string;
  isSticky: boolean;
}

export enum NotificationType {
  DEFAULT,
  INFO,
  SUCCESS,
  WARNING,
  ERROR
}
