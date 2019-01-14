import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JobPublicationFormPanelId } from './job-publication-form-panel-id.enum';
import { CompanyGroup, emptyCompanyGroup } from './company/company-group.types';
import { IsoCountryService } from './iso-country.service';

@Component({
  selector: 'alv-job-publication-form',
  templateUrl: './job-publication-form.component.html',
  styleUrls: ['./job-publication-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobPublicationFormComponent implements OnInit {

  jobPublicationForm = new FormGroup({});

  jobPublicationFormPanelId = JobPublicationFormPanelId;

  companyGroupValue: CompanyGroup;

  ngOnInit(): void {
    this.companyGroupValue = emptyCompanyGroup;
  }
}


