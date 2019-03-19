import { Component } from '@angular/core';
import { LinkPanelId } from '../../shared/layout/link-panel/link-panel.component';

@Component({
  selector: 'alv-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent {

  LinkPanelId = LinkPanelId;

}
