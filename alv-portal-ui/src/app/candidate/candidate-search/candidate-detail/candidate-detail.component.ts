import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CandidateDetailPanelId } from './candidate-detail-panel-id.enum';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  CandidateSearchState,
  ContactCandidateAction,
  CopyLinkAction,
  ExpandContactInfoAction,
  getSelectedCandidateProfile,
  isNextVisible,
  isPrevVisible,
  LoadNextCandidateProfileDetailAction,
  LoadPreviousCandidateProfileDetailAction,
  PrintPageAction,
  SelectCandidatePhoneAction,
  SelectRavEmailAction,
  SelectRavPhoneAction,
  SendLinkAction
} from '../state-management';
import {
  CandidateProfileBadge,
  CandidateProfileBadgesMapperService
} from '../candidate-profile-badges-mapper.service';
import { CandidateDetailModelFactory } from './candidate-detail-model-factory';
import { CandidateDetailModel } from './candidate-detail-model';
import { filter, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { findRelevantJobExperience, hasEmailContactType } from '../candidate-rules';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { CandidateProfile } from '../../../shared/backend-services/candidate/candidate.types';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { hasAnyAuthorities, UserRole } from '../../../core/auth/user.model';
import { LayoutConstants } from '../../../shared/layout/layout-constants.enum';
import { NotificationsService } from '../../../core/notifications.service';
import { NotificationType } from '../../../shared/layout/notifications/notification.model';
import { WINDOW } from '../../../core/window.service';
import { ActivatedRoute } from '@angular/router';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';


@Component({
  selector: 'alv-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent extends AbstractSubscriber implements OnInit {

  private static readonly ALERTS = {
    copiedLinkToClipboard: {
      type: NotificationType.SUCCESS,
      messageKey: 'global.messages.tooltip.link-copy.success',
      isSticky: false
    }
  };

  readonly NUMBER_OF_JOBS_TO_SHOW = 3;

  layoutConstants = LayoutConstants;

  isProtectedDataCollapsed = true;

  candidateDetailModel$: Observable<CandidateDetailModel>;

  prevEnabled$: Observable<boolean>;

  nextEnabled$: Observable<boolean>;

  canContactCandidatePerEmail$: Observable<boolean>;

  badges$: Observable<CandidateProfileBadge[]>;

  candidateDetailPanelId = CandidateDetailPanelId;

  @ViewChild(NgbTooltip, { static: false })
  clipboardTooltip: NgbTooltip;

  constructor(private store: Store<CandidateSearchState>,
              private authenticationService: AuthenticationService,
              private candidateDetailModelFactory: CandidateDetailModelFactory,
              private candidateProfileBadgesMapperService: CandidateProfileBadgesMapperService,
              private modalService: ModalService,
              private notificationsService: NotificationsService,
              private activatedRoute: ActivatedRoute,
              @Inject(WINDOW) private window: Window) {
    super();
  }

  ngOnInit() {
    const candidateProfile$ = this.store.pipe(select(getSelectedCandidateProfile)).pipe(filter(candidateProfile => !!candidateProfile));

    this.badges$ = candidateProfile$.pipe(
      map(candidateProfile => this.candidateProfileBadgesMapperService.map(candidateProfile, findRelevantJobExperience(candidateProfile)))
    );

    this.candidateDetailModel$ = candidateProfile$.pipe(switchMap(candidateProfile => this.candidateDetailModelFactory.create(candidateProfile)));

    this.prevEnabled$ = this.store.pipe(select(isPrevVisible));

    this.nextEnabled$ = this.store.pipe(select(isNextVisible));

    this.canContactCandidatePerEmail$ = candidateProfile$.pipe(
      withLatestFrom(this.authenticationService.getCurrentUser()),
      map(([candidate, user]) => {
        const rolePavOrCompany = hasAnyAuthorities(user, [UserRole.ROLE_PAV, UserRole.ROLE_COMPANY]);
        const emailContactType = hasEmailContactType(candidate);
        return rolePavOrCompany && emailContactType;
      })
    );

    this.activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.isProtectedDataCollapsed = true;
      });
  }

  prev() {
    this.store.dispatch(new LoadPreviousCandidateProfileDetailAction());
  }

  next() {
    this.store.dispatch(new LoadNextCandidateProfileDetailAction());
  }

  printCandidate() {
    this.store.dispatch(new PrintPageAction());
    this.window.print();
  }

  openContactModal(candidateProfile: CandidateProfile): void {
    this.store.dispatch(new ContactCandidateAction());

    this.appendCandidateToModalRef(candidateProfile)
      .then(() => this.notificationsService.success('candidate-detail.candidate-anonymous-contact.success'), () => {
      });
  }

  appendCandidateToModalRef(candidateProfile: CandidateProfile) {
    const ngbModalRef = this.modalService.openLarge(ContactModalComponent);
    ngbModalRef.componentInstance.candidate = Object.assign({}, candidateProfile);
    return ngbModalRef.result;
  }

  onCopyLink(): void {
    this.store.dispatch(new CopyLinkAction());

    this.notificationsService.add(CandidateDetailComponent.ALERTS.copiedLinkToClipboard);
  }

  getEncodedUrl() {
    return encodeURIComponent(this.getCandidateUrl());
  }

  getCandidateUrl() {
    return this.window.location.href;
  }

  sendEmail() {
    this.store.dispatch(new SendLinkAction());
    this.window.location.href = 'mailto:?body=' + this.getEncodedUrl();
  }

  logPhoneRav() {
    this.store.dispatch(new SelectRavPhoneAction());
  }

  logEmailRav() {
    this.store.dispatch(new SelectRavEmailAction());
  }

  logSelectCandidatePhone() {
    this.store.dispatch(new SelectCandidatePhoneAction());

  }

  onCandidateProtectedDataCollapsed(isCollapsedAfterClick: boolean) {
    this.isProtectedDataCollapsed = isCollapsedAfterClick;
    if (!isCollapsedAfterClick) {
      this.store.dispatch(new ExpandContactInfoAction());
    }
  }

}
