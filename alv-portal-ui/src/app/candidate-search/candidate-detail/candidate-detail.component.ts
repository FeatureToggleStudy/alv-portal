import { Component, OnInit, ViewChild } from '@angular/core';
import { Notification } from '../../shared/layout/notifications/notification.model';
import { CandidateDetailPanelId } from './candidate-detail-panel-id.enum';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/index';
import { CandidateProfile } from '../../shared/backend-services/candidate/candidate.types';
import { select, Store } from '@ngrx/store';
import {
  CandidateSearchState,
  getSelectedCandidateProfile,
  isNextVisible,
  isPrevVisible,
  LoadNextCandidateProfileDetailAction,
  LoadPreviousCandidateProfileDetailAction
} from '../state-management';
import { CandidateProfileBadge } from '../candidate-profile-badges-mapper.service';


const TOOLTIP_AUTO_HIDE_TIMEOUT = 2500;

@Component({
  selector: 'alv-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent implements OnInit {

  candidateProfile$: Observable<CandidateProfile>;

  prevEnabled$: Observable<boolean>;

  nextEnabled$: Observable<boolean>;

  //todo: implement
  alerts$: Observable<Notification[]>;

  //todo: implement
  badges$: Observable<CandidateProfileBadge[]>;

  candidateDetailPanelId = CandidateDetailPanelId;

  @ViewChild(NgbTooltip)
  clipboardTooltip: NgbTooltip;

  constructor(private store: Store<CandidateSearchState>) {
  }

  ngOnInit() {
    //todo: Create a model for the detail page and map the candidateProfile$ to it
    this.candidateProfile$ = this.store.pipe(select(getSelectedCandidateProfile));

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
