import { Component, OnInit, ViewChild } from '@angular/core';
import { Notification, NotificationType } from '../../shared/layout/notifications/notification.model';
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
import { CandidateProfileBadge, CandidateProfileBadgesMapperService } from '../candidate-profile-badges-mapper.service';
import { CandidateDetailModelFactory } from './candidate-detail-model-factory';
import { CandidateDetailModel } from './candidate-detail-model';
import {  map, switchMap, withLatestFrom } from 'rxjs/operators';
import { findRelevantJobExperience } from '../candidate-rules';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { CandidateProfile } from '../../shared/backend-services/candidate/candidate.types';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { User, UserRole } from '../../core/auth/user.model';


const TOOLTIP_AUTO_HIDE_TIMEOUT = 2500;

@Component({
  selector: 'alv-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent implements OnInit {

  readonly NUMBER_OF_JOBS_TO_SHOW = 3;

  readonly CONTACT_MODAL_NOTIFICATION: Notification = {
    type: NotificationType.SUCCESS,
    messageKey: 'candidate-detail.candidate-anonymous-contact.success',
    isSticky: true
  };

  candidateDetailModel$: Observable<CandidateDetailModel>;

  prevEnabled$: Observable<boolean>;

  nextEnabled$: Observable<boolean>;

  canContactCandidatePerEmail$: Observable<boolean>;

  badges$: Observable<CandidateProfileBadge[]>;

  candidateDetailPanelId = CandidateDetailPanelId;

  contactModalSuccess = false;

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

    this.canContactCandidatePerEmail$ = candidateProfile$.pipe(
        withLatestFrom(this.authenticationService.getCurrentUser()),
        map(([candidate, user]) => this.isValid(candidate, user))
    );

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
    this.appendCandidate(candidateProfile)
        .then( () => this.contactModalSuccess = true, () => {});
  }

  hideContactModalSuccess() {
    this.contactModalSuccess = false;
  }

  appendCandidate(candidateProfile: CandidateProfile) {
    const ngbModalRef = this.modalService.openLarge(ContactModalComponent);
    ngbModalRef.componentInstance.candidate = Object.assign({}, candidateProfile);
    return ngbModalRef.result;
  }

  isValid(candidate: CandidateProfile, user: User) {

    if(candidate == null || user == null) {
      return false;
    }
    console.log(user.id + ' , ' + candidate.id);
    const rolePavOrCompany = user.hasAnyAuthorities([UserRole.ROLE_PAV, UserRole.ROLE_COMPANY]);
    const emailContactType = candidate.contactTypes && candidate.contactTypes.includes('EMAIL');

    return rolePavOrCompany && emailContactType;
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
