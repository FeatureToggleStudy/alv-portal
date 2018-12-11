import { TestBed } from '@angular/core/testing';

import { SessionManagerService } from './session-manager.service';
import { Store } from '@ngrx/store';
import { CoreState } from '../../state-management/state/core.state.ts';
import { SessionExpiredAction } from '../../state-management/actions/core.actions';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('SessionManagerService', () => {

  const TESTING_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NDQ0NjUxNzcsImV4cCI6MTU0NDQ2NjM3NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20ifQ.uzdmb4Vq0OhDTaY2OLsjjMO262ZQsK3eDoSYvisFipA';

  const mockStore: SpyObj<Store<CoreState>> = createSpyObj('mockStore', ['dispatch']);

  let sut: SessionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionManagerService,
        { provide: Store, useValue: mockStore },
      ],
    });
    sut = TestBed.get(SessionManagerService);

  });

  it('should set token', () => {
    // when
    sut.setToken(TESTING_TOKEN);

    // then
    expect(sut.getToken()).toEqual(TESTING_TOKEN);
  });

  it('should clear token', () => {
    // given
    sut.setToken(TESTING_TOKEN);

    // when
    sut.clearToken();

    // then
    expect(sut.getToken()).toEqual(null);
  });


  it('should dispatch SessionExpiredAction', (done) => {
    // given
    sut.setToken(TESTING_TOKEN);

    // then
    setTimeout(() => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(new SessionExpiredAction({}));
      done();
    });
  });

});
