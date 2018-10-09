import { inject, TestBed } from '@angular/core/testing';
import 'jasmine-expect';

import { NotificationService } from './notification.service';

const isNotificationsSorted = (arr) => {
  return arr.every((cur, index) =>
      !index || cur.type >= arr[index - 1].type)
};

describe('NotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));

  it('should arrange added elements according to their type', inject([NotificationService], (service: NotificationService) => {
    service.info("Avesome info message");
    service.error("Avesome info message");
    service.warning("Avesome info message");
    service.default("Avesome info message");
    expect(isNotificationsSorted(service.notifications))
        .toBeTrue('notifications array must be sorted');

  }));
});
