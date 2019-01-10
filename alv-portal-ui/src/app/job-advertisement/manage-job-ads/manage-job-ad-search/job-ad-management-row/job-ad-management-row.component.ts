import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../../shared/layout/modal/modal.service';
import { JobAdCancellationComponent } from '../../shared/job-ad-cancellation/job-ad-cancellation.component';
import { JobAdvertisement } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { Observable } from 'rxjs';
import { JobAdManagementRow } from './job-ad-management-row';
import { map } from 'rxjs/operators';
import { I18nService } from '../../../../core/i18n.service';

@Component({
  // we need to use attribute selector because we don't want angular to create an element
  // in the html structure breaking the bootstrap styles.
  // tslint:disable-next-line
  selector: '[alv-job-ad-management-row]',
  templateUrl: './job-ad-management-row.component.html',
  styleUrls: ['./job-ad-management-row.component.scss']
})
export class JobAdManagementRowComponent implements OnInit {

  @Input()
  jobAdvertisement: JobAdvertisement;

  jobAdManagementRow$: Observable<JobAdManagementRow>;

  constructor(private modalService: ModalService, private i18nService: I18nService) {
  }

  ngOnInit() {
    this.jobAdManagementRow$ = this.i18nService.currentLanguage$.pipe(
      map((currentLanguage) => new JobAdManagementRow(this.jobAdvertisement, currentLanguage))
    );
  }

  cancelJobAdAction() {
    const jobAdCancellationModalRef = this.modalService.openLarge(JobAdCancellationComponent);
    const jobAdCancellationComponent = <JobAdCancellationComponent>jobAdCancellationModalRef.componentInstance;
    jobAdCancellationComponent.jobAdvertisement = this.jobAdvertisement;
    jobAdCancellationModalRef.result
      .then(value => console.log(value))
      .catch(() => {
      });
  }

}
