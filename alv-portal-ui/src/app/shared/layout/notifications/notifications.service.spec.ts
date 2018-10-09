import { inject, TestBed } from '@angular/core/testing';
import 'jasmine-expect';

import { NotificationsService } from './notifications.service';

const isNotificationsSorted = (arr) => {
  return arr.every((cur, index) =>
      !index || cur.type >= arr[index - 1].type)
};

describe('NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationsService]
    });
  });

  it('should be created', inject([NotificationsService], (service: NotificationsService) => {
    expect(service).toBeTruthy();
  }));

  it('should arrange added elements according to their type', inject([NotificationsService], (service: NotificationsService) => {
    service.info("Avesome info message");
    service.error("Avesome info message");
    service.warning("Avesome info message");
    service.default("Avesome info message");
    expect(isNotificationsSorted(service.notifications))
        .toBeTrue('notifications array must be sorted');

  }));
});
