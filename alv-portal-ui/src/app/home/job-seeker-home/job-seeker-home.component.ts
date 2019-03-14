import { Component } from '@angular/core';
import { LinkPanelId } from '../../shared/layout/link-panel/link-panel.component';

@Component({
  selector: 'alv-job-seeker-home',
  templateUrl: './job-seeker-home.component.html',
  styleUrls: ['./job-seeker-home.component.scss']
})
export class JobSeekerHomeComponent {
  LinkPanelId = LinkPanelId;
}
