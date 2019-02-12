import { Component, Input } from '@angular/core';
import { User } from '../../core/auth/user.model';
import { CompanyContactTemplateModel } from '../../core/auth/company-contact-template-model';

@Component({
  selector: 'alv-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {

  @Input() user: User;

  @Input() company: CompanyContactTemplateModel;

  constructor() {
  }

}
