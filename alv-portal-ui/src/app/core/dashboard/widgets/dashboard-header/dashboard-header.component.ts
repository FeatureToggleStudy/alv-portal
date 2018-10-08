import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../auth/user.model';

@Component({
  selector: 'alv-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
