import { inject, TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '../../../../node_modules/@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule]
    });
  });

  const headers = { headers: new HttpHeaders({ 'Authorization': 'token' }) };

  it('should refresh getCurrentUser', inject([HttpTestingController, AuthenticationService],
      (httpMock: HttpTestingController, service: AuthenticationService) => {
        service.getCurrentUser(true).subscribe(data => {
          expect(data.login).toBe('login');
          expect(service.isAuthenticated()).toBeTruthy();
        });

        const req = httpMock.expectOne('/api/current-user');
        expect(req.request.method).toEqual('GET');
        req.flush({ login: 'login' }, headers);
      })
  );

  it('should login', inject([HttpTestingController, AuthenticationService],
      (httpMock: HttpTestingController, service: AuthenticationService) => {
        service.login({ username: 'user', password: 'pw', rememberMe: true })
            .subscribe(data => {
              expect(data.login).toBe('login');
              expect(service.isAuthenticated()).toBeTruthy();
            });

        const req1 = httpMock.expectOne('/api/authenticate');
        expect(req1.request.method).toEqual('POST');
        req1.flush({}, headers);

        const req2 = httpMock.expectOne('/api/current-user');
        expect(req2.request.method).toEqual('GET');
        req2.flush({ login: 'login' }, headers);
      })
  );

  it('should logout', inject([HttpTestingController, AuthenticationService],
      (httpMock: HttpTestingController, service: AuthenticationService) => {
        service.getCurrentUser(true).subscribe(user => {
          expect(user.login).toEqual('login');
          expect(service.isAuthenticated()).toBeTruthy();

          service.logout();

          expect(service.isAuthenticated()).toBeFalsy();
        });

        const req = httpMock.expectOne('/api/current-user');
        expect(req.request.method).toEqual('GET');
        req.flush({ login: 'login' }, headers);
      })
  );

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

});
