import { Component, Input } from '@angular/core';
import { User } from '../../core/auth/user.model';


@Component({
  selector: 'alv-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  @Input() user: User;

}
