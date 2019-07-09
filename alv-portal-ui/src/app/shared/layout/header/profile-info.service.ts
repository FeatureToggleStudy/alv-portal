import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, skipWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  private profileInfo$ = new Subject<ProfileInfo>();

  constructor(private httpClient: HttpClient) {
    this.initProfileInfo();
  }

  getProfileInfo(): Observable<ProfileInfo> {
    return this.profileInfo$;
  }

  private initProfileInfo() {
    this.httpClient.get<ProfileInfoResource>('/api/profile-info').pipe(
      skipWhile(profile => !profile),
      map((data) => {
        return <ProfileInfo>{
          activeProfiles: data.activeProfiles,
          ribbonEnv: data.ribbonEnv,
          inProduction: data.activeProfiles.includes('prod'),
          swaggerEnabled: data.activeProfiles.includes('swagger'),
          noEiam: data.activeProfiles.includes('no-eiam')
        };
      })
    ).subscribe(profileInfo => {
      this.profileInfo$.next(profileInfo);
    });
  }
}

interface ProfileInfoResource {
  activeProfiles: string[];
  ribbonEnv: string;
}

export interface ProfileInfo {
  activeProfiles: string[];
  ribbonEnv: string;
  inProduction: boolean;
  swaggerEnabled: boolean;
  noEiam: boolean;
}
