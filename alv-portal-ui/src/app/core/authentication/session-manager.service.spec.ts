import { TestBed, inject } from '@angular/core/testing';

import { SessionManagerService } from './session-manager.service';

describe('SessionManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionManagerService]
    });
  });

  it('should set token', inject([SessionManagerService], (service: SessionManagerService) => {
    service.setToken('token');
    expect(service.getToken()).toEqual('token');
  }));

  it('should clear token', inject([SessionManagerService], (service: SessionManagerService) => {
    service.setToken('token');
    service.clearToken();
    expect(service.getToken()).toEqual(null);
  }));

});
