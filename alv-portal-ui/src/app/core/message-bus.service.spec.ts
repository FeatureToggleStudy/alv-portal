import { inject, TestBed } from '@angular/core/testing';
import { MessageBusService, MessageType } from './message-bus.service';


describe('MessageBusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageBusService]
    });
  });

  it('should emit empty message', inject([MessageBusService], (service: MessageBusService) => {
    service.of(MessageType.TOGGLE_MOBILE_NAVIGATION).subscribe((message) => {
      expect(message).toBeUndefined();
    });
    service.emit(MessageType.TOGGLE_MOBILE_NAVIGATION);
  }));

  it('should emit boolean message', inject([MessageBusService], (service: MessageBusService) => {
    service.of<boolean>(MessageType.TOGGLE_DESKTOP_NAVIGATION).subscribe((message) => {
      expect(message.valueOf).toBeTruthy();
    });
    service.emit<boolean>(MessageType.TOGGLE_DESKTOP_NAVIGATION, true);
  }));
});
