import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  private profileInfo: Observable<ProfileInfo>;

  constructor(private httpClient: HttpClient) {
  }

  getProfileInfo(): Observable<ProfileInfo> {
    if (!this.profileInfo) {
      this.profileInfo = this.httpClient.get<ProfileInfo>('/api/profile-info').pipe(
          map((data) => {
            return <ProfileInfo>{
              activeProfiles: data.activeProfiles,
              ribbonEnv: data.ribbonEnv,
              inProduction: data.activeProfiles.includes('prod'),
              swaggerEnabled: data.activeProfiles.includes('swagger'),
              noEiam: data.activeProfiles.includes('no-eiam')
            };
          })
      );
    }
    return this.profileInfo;
  }

}

export interface ProfileInfo {
  activeProfiles: string[];
  ribbonEnv: string;
  inProduction: boolean;
  swaggerEnabled: boolean;
  noEiam: boolean;
}
