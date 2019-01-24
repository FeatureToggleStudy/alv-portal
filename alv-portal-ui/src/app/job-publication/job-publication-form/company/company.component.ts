import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CompanyFormValue } from './company-form-value.types';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';


@Component({
  selector: 'alv-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {

  @Input()
  parentForm: FormGroup;

  @Input()
  companyFormValue: CompanyFormValue;

  groupName = JobPublicationFormValueKeys.company;
}
