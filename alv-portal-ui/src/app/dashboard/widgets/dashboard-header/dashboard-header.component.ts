import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../core/auth/user.model';

const TIME_KEYS: Array<{ from: number, to: number, kex: string }> = [
  { from: 0, to: 5, kex: 'portal.dashboard.header.welcome.time.night' },
  { from: 6, to: 11, kex: 'portal.dashboard.header.welcome.time.morning' },
  { from: 12, to: 17, kex: 'portal.dashboard.header.welcome.time.afternoon' },
  { from: 18, to: 23, kex: 'portal.dashboard.header.welcome.time.evening' }
];

@Component({
  selector: 'alv-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Input() user: User;

  timeTextKey: string;

  constructor() {
  }

  ngOnInit() {
    const hr = new Date().getHours();
    this.timeTextKey = TIME_KEYS.find((e) => hr >= e.from && hr <= e.to).kex;
  }

}
