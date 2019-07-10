import { Component, HostBinding, Inject, Input, OnInit } from '@angular/core';
import {
  ProofOfWorkEfforts,
  WorkEffort
} from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { ProofOfWorkEffortsRepository } from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.repository';
import { WINDOW } from '../../../../core/window.service';
import { DOCUMENT } from '@angular/common';
import { I18nService } from '../../../../core/i18n.service';
import { withLatestFrom } from 'rxjs/operators';
import { ProofOfWorkEffortsModel } from './proof-of-work-efforts.model';

@Component({
  selector: 'alv-proof-of-work-efforts',
  templateUrl: './proof-of-work-efforts.component.html',
  styleUrls: ['./proof-of-work-efforts.component.scss']
})
export class ProofOfWorkEffortsComponent implements OnInit {

  @Input() proofOfWorkEffortsModel: ProofOfWorkEffortsModel;

  @Input() expanded: boolean;

  @HostBinding('class.current-period')
  isCurrentPeriod: boolean;

  constructor(private proofOfWorkEffortsRepository: ProofOfWorkEffortsRepository,
              private i18nService: I18nService,
              @Inject(DOCUMENT) private document: any,
              @Inject(WINDOW) private window: Window) {
  }

  ngOnInit() {
    this.isCurrentPeriod = this.proofOfWorkEffortsModel.isCurrentPeriod;
    this.expanded = this.proofOfWorkEffortsModel.isCurrentPeriod;
  }

  removeWorkEffort(deletedWorkEffort: WorkEffort) {
    const indexToRemove = this.proofOfWorkEffortsModel.workEfforts.findIndex(workEffortModel => workEffortModel.workEffort.id === deletedWorkEffort.id);
    this.proofOfWorkEffortsModel.workEfforts.splice(indexToRemove, 1);
  }

  downloadPdf(proofOfWorkEfforts: ProofOfWorkEfforts) {
    this.proofOfWorkEffortsRepository.downloadPdf(proofOfWorkEfforts.id).pipe(
      withLatestFrom(this.i18nService.stream('portal.work-efforts.proof-of-work-efforts.pdf-file.name'))
    ).subscribe(([blob, filenamePrefix]) => {
        const filename = filenamePrefix + this.proofOfWorkEffortsModel.controlPeriodDateString;
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
