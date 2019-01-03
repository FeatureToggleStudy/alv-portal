import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProfileInfoService } from './profile-info.service';

describe('ProfileInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileInfoService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should emit empty message', inject([HttpTestingController, ProfileInfoService], (httpMock: HttpTestingController, service: ProfileInfoService) => {
    service.getProfileInfo().subscribe(profileInfo => {
      expect(profileInfo.noEiam).toBeTruthy();
      expect(profileInfo.activeProfiles.includes('no-eiam'));
    });

    const req = httpMock.expectOne('/api/profile-info');
    expect(req.request.method).toEqual('GET');
    req.flush({ activeProfiles: ['no-eiam'] });
  }));

});
