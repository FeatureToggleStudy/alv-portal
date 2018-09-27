import { inject, TestBed } from '@angular/core/testing';
import { MessageBusService, MessageType } from './message-bus.service';
import { User } from './authentication/user.model';


describe('MessageBusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageBusService]
    });
  });

  it('should emit empty message', inject([MessageBusService], (service: MessageBusService) => {
    service.of(MessageType.TOGGLE_NAVIGATION).subscribe((message) => {
      expect(message).toBeUndefined();
    });
    service.emit(MessageType.TOGGLE_NAVIGATION);
  }));

  it('should emit CURRENT_USER message', inject([MessageBusService], (service: MessageBusService) => {
    const user: User = {
      id: 'id',
      login: 'login',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      langKey: 'langKey',
      authorities: []
    };

    service.of<User>(MessageType.CURRENT_USER).subscribe((message) => {
      expect(message).toEqual(user);
    });

    service.emit<User>(MessageType.CURRENT_USER, user);
  }));

});
