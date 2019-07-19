import {
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnInit, Output
} from '@angular/core';
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
import { WorkEffortModel } from '../work-effort/work-effort.model';
import { FileSaverService } from '../../../../shared/file-saver/file-saver.service';

@Component({
  selector: 'alv-proof-of-work-efforts',
  templateUrl: './proof-of-work-efforts.component.html',
  styleUrls: ['./proof-of-work-efforts.component.scss']
})
export class ProofOfWorkEffortsComponent implements OnInit {

  @Input() proofOfWorkEffortsModel: ProofOfWorkEffortsModel;

  @Input() expanded: boolean;

  @Output() reload = new EventEmitter<ProofOfWorkEffortsModel>();

  @HostBinding('class.current-period')
  isCurrentPeriod: boolean;

  constructor(private proofOfWorkEffortsRepository: ProofOfWorkEffortsRepository,
              private i18nService: I18nService,
              private fileSaverService: FileSaverService,
              @Inject(DOCUMENT) private document: any,
              @Inject(WINDOW) private window: Window) {
  }

  ngOnInit() {
    this.isCurrentPeriod = this.proofOfWorkEffortsModel.isCurrentPeriod;
    this.expanded = this.proofOfWorkEffortsModel.isCurrentPeriod;
  }

  removeWorkEffort(deletedWorkEffort: WorkEffortModel) {
    const indexToRemove = this.proofOfWorkEffortsModel.workEfforts.findIndex(workEffortModel => workEffortModel.id === deletedWorkEffort.id);
    this.proofOfWorkEffortsModel.workEfforts.splice(indexToRemove, 1);
    this.reload.emit(this.proofOfWorkEffortsModel);
  }

  downloadPdf(proofOfWorkEffortsId: string, $event: Event) {
    $event.stopPropagation();
    this.proofOfWorkEffortsRepository.downloadPdf(proofOfWorkEffortsId).pipe(
      withLatestFrom(this.i18nService.stream('portal.work-efforts.proof-of-work-efforts.pdf-file.name'))
    ).subscribe(([blob, filenamePrefix]) => {
        const filename = filenamePrefix + this.proofOfWorkEffortsModel.controlPeriodDateString;
        this.fileSaverService.saveFile(blob, filename);
      }
    );
  }
}
