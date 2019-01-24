import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alv-user-name-and-company',
  templateUrl: './user-name-and-company.component.html',
  styleUrls: ['./user-name-and-company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UserNameAndCompanyComponent {
  @Input() displayName;
  @Input() company;
}
