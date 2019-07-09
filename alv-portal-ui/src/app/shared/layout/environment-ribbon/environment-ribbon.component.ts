import { Component, OnInit } from '@angular/core';
import { ProfileInfoService } from '../header/profile-info.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'alv-environment-ribbon',
  templateUrl: './environment-ribbon.component.html',
  styleUrls: ['./environment-ribbon.component.scss']
})
export class EnvironmentRibbonComponent implements OnInit {

  currentRibbon: EnvironmentRibbon;

  environmentRibbons = [
    {
      name: 'dev',
      label: 'Development',
      backgroundColor: '#BBBBBB'
    },
    {
      name: 'test',
      label: 'Testing',
      backgroundColor: '#AFE29F'
    },
    {
      name: 'training',
      label: 'Training',
      backgroundColor: '#ABCDEF'
    },
    {
      name: 'staging',
      label: 'Staging',
      backgroundColor: '#FFE8A0'
    }
  ];

  constructor(private profileInfoService: ProfileInfoService) {
  }

  ngOnInit() {
    this.profileInfoService.getProfileInfo()
      .pipe(take(1))
      .subscribe(profileInfo => {
        this.currentRibbon = this.environmentRibbons.find(
          environment => !!profileInfo.activeProfiles.find(
            activeProfile => activeProfile === environment.name)
        );
      });
  }
}

interface EnvironmentRibbon {
  name: string;
  label: string;
  backgroundColor: string;
}
