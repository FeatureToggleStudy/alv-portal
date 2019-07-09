import { Component, HostBinding, Inject, Input, OnInit } from '@angular/core';
import {
  ControlPeriodType,
  WorkEffort,
  WorkEffortsReport,
  WorkEffortsReportStatus
} from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { ProofOfWorkEffortsRepository } from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.repository';
import { WINDOW } from '../../../../core/window.service';
import { DOCUMENT } from '@angular/common';
import { I18nService } from '../../../../core/i18n.service';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'alv-work-efforts-report',
  templateUrl: './work-efforts-report.component.html',
  styleUrls: ['./work-efforts-report.component.scss']
})
export class WorkEffortsReportComponent implements OnInit {

  @Input() workEffortsReport: WorkEffortsReport;

  @Input() expanded: boolean;

  @HostBinding('class.current-period')
  @Input() isCurrentPeriod: boolean;

  constructor(private proofOfWorkEffortsRepository: ProofOfWorkEffortsRepository,
              private i18nService: I18nService,
              @Inject(DOCUMENT) private document: any,
              @Inject(WINDOW) private window: Window) {
  }

  ngOnInit() {
    this.expanded = this.isCurrentPeriod;
  }

  isSentSuccessfully(workEffortsReport: WorkEffortsReport): boolean {
    return workEffortsReport.status === WorkEffortsReportStatus.SUBMITTED ||
      workEffortsReport.status === WorkEffortsReportStatus.CLOSED;
  }

  isBeforeEmployment(workEffortsReport: WorkEffortsReport): boolean {
    return workEffortsReport.controlPeriod.type === ControlPeriodType.BEFORE_UNEMPLOYMENT;
  }

  getDateStringFromControlPeriod(workEffortsReport: WorkEffortsReport): string {
    return workEffortsReport.controlPeriod.value;
  }

  removeWorkEffort(deletedWorkEffort: WorkEffort) {
    const indexToRemove = this.workEffortsReport.workEfforts.findIndex(workEffort => workEffort.id === deletedWorkEffort.id);
    this.workEffortsReport.workEfforts.splice(indexToRemove, 1);
  }

  getSubmissionDate(workEffortsReport: WorkEffortsReport): string {
    return this.isSentSuccessfully(workEffortsReport) ? workEffortsReport.lastSubmittedAt : workEffortsReport.nextSubmissionDate;
  }

  isReportClosed(workEffortsReport: WorkEffortsReport): boolean {
    return workEffortsReport.status === WorkEffortsReportStatus.CLOSED;
  }

  getMonthValue(controlPeriodValue: string): number {
    return controlPeriodValue ? parseInt(controlPeriodValue.split('-')[1], 10) : null;
  }

  downloadPdf(proofOfWorkEfforts: WorkEffortsReport) {
    this.proofOfWorkEffortsRepository.downloadPdf(proofOfWorkEfforts.id).pipe(
      withLatestFrom(this.i18nService.stream('portal.work-efforts.work-effort-report.pdf-file.name'))
    ).subscribe(([blob, filenamePrefix]) => {
        const filename = filenamePrefix + this.getDateStringFromControlPeriod(proofOfWorkEfforts);
        // Handle Edge and IE11 separately (as usual)
        if (this.window.navigator && this.window.navigator.msSaveOrOpenBlob) {
          this.window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          const element = this.document.createElement('a');
          element.href = URL.createObjectURL(blob);
          element.download = filename;
          this.document.body.appendChild(element);
          element.click();
        }
      }
    );
  }
}
