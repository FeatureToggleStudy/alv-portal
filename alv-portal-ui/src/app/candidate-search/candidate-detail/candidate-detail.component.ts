import { Component, OnInit, ViewChild } from '@angular/core';
import { Notification } from '../../shared/layout/notifications/notification.model';
import { CandidateDetailPanelId } from './candidate-detail-panel-id.enum';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  CandidateSearchState,
  getSelectedCandidateProfile,
  isNextVisible,
  isPrevVisible,
  LoadNextCandidateProfileDetailAction,
  LoadPreviousCandidateProfileDetailAction
} from '../state-management';
import {
  CandidateProfileBadge,
  CandidateProfileBadgesMapperService
} from '../candidate-profile-badges-mapper.service';
import { CandidateDetailModelFactory } from './candidate-detail-model-factory';
import { CandidateDetailModel } from './candidate-detail-model';
import { map, switchMap } from 'rxjs/operators';
import { findRelevantJobExperience } from '../candidate-rules';
import { AuthenticationService } from '../../core/auth/authentication.service';
import {CandidateProfile} from '../../shared/backend-services/candidate/candidate.types';
import {ModalService} from '../../shared/layout/modal/modal.service';
import {ContactModalComponent} from './contact-modal/contact-modal.component';


const TOOLTIP_AUTO_HIDE_TIMEOUT = 2500;

@Component({
  selector: 'alv-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent implements OnInit {

  readonly NUMBER_OF_JOBS_TO_SHOW = 3;

  candidateDetailModel$: Observable<CandidateDetailModel>;

  prevEnabled$: Observable<boolean>;

  nextEnabled$: Observable<boolean>;

  badges$: Observable<CandidateProfileBadge[]>;

  candidateDetailPanelId = CandidateDetailPanelId;

  @ViewChild(NgbTooltip)
  clipboardTooltip: NgbTooltip;

  constructor(private store: Store<CandidateSearchState>,
              private authenticationService: AuthenticationService,
              private candidateDetailModelFactory: CandidateDetailModelFactory,
              private candidateProfileBadgesMapperService: CandidateProfileBadgesMapperService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    const candidateProfile$ = this.store.pipe(select(getSelectedCandidateProfile));

    this.badges$ = candidateProfile$.pipe(
      map(candidateProfile => this.candidateProfileBadgesMapperService.map(candidateProfile, findRelevantJobExperience(candidateProfile)))
    );

    this.candidateDetailModel$ = candidateProfile$.pipe(switchMap(candidateProfile => this.candidateDetailModelFactory.create(candidateProfile)));

    this.prevEnabled$ = this.store.pipe(select(isPrevVisible));

    this.nextEnabled$ = this.store.pipe(select(isNextVisible));
  }

  prev() {
    this.store.dispatch(new LoadPreviousCandidateProfileDetailAction());
  }

  next() {
    this.store.dispatch(new LoadNextCandidateProfileDetailAction());
  }

  dismissAlert(alert: Notification, alerts: Notification[]) {
    alerts.splice(alerts.indexOf(alert), 1);
  }

  printCandidate() {
    window.print();
  }

  openContactModal(candidateProfile: CandidateProfile): void {
    this.open(candidateProfile)
        .then( () => {}, () => {});
  }

  open(candidateProfile: CandidateProfile) {
    const ngbModalRef = this.modalService.openLarge(ContactModalComponent);
    ngbModalRef.componentInstance.candidate = Object.assign({}, candidateProfile);
    return ngbModalRef.result;
  }

  onCopyLink(): void {
    this.clipboardTooltip.open();
    setTimeout(() => this.clipboardTooltip.close(), TOOLTIP_AUTO_HIDE_TIMEOUT);
  }

  getEncodedUrl() {
    return encodeURIComponent(this.getCandidateUrl());
  }

  getCandidateUrl() {
    return window.location.href;
  }

}
