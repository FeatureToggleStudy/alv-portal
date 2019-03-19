import { Component } from '@angular/core';
import { LinkPanelId } from '../../shared/layout/link-panel/link-panel.component';

@Component({
  selector: 'alv-job-seeker-dashboard',
  templateUrl: './job-seeker-dashboard.component.html',
  styleUrls: ['./job-seeker-dashboard.component.scss']
})
export class JobSeekerDashboardComponent {
  LinkPanelId = LinkPanelId;
}
