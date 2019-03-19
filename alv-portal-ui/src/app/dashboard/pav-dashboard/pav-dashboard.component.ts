import { Component } from '@angular/core';
import { LinkPanelId } from '../../shared/layout/link-panel/link-panel.component';

@Component({
  selector: 'alv-pav-dashboard',
  templateUrl: './pav-dashboard.component.html',
  styleUrls: ['./pav-dashboard.component.scss']
})
export class PavDashboardComponent {
  LinkPanelId = LinkPanelId;
}
