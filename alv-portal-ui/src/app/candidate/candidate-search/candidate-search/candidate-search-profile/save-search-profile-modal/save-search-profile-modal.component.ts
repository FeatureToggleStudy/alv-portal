import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, flatMap, take, withLatestFrom } from 'rxjs/operators';
import { EMPTY, throwError } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { CandidateSearchProfileService } from '../candidate-search-profile.service';
import { CandidateSearchProfilesRepository } from '../../../../../shared/backend-services/candidate-search-profiles/candidate-search-profiles.repository';
import {
  CandidateSearchState,
  getCandidateSearchFilter
} from '../../../state-management/state';
import {
  CreateCandidateSearchProfile,
  SearchProfileErrors
} from '../../../../../shared/backend-services/candidate-search-profiles/candidate-search-profiles.types';
import { NotificationsService } from '../../../../../core/notifications.service';
import { getCurrentUser } from '../../../../../core/state-management/state/core.state.ts';

@Component({
  selector: 'alv-save-search-profile-modal',
  templateUrl: './save-search-profile-modal.component.html',
  styleUrls: ['./save-search-profile-modal.component.scss']
})
export class SaveSearchProfileModalComponent implements OnInit {

  readonly MAX_LENGTH_50 = 50;

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private store: Store<CandidateSearchState>,
              private candidateSearchProfilesRepository: CandidateSearchProfilesRepository,
              private candidateSearchProfileService: CandidateSearchProfileService,
              private notificationsService: NotificationsService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.store.pipe(
      select(getCurrentUser),
      withLatestFrom(this.store.pipe(select(getCandidateSearchFilter))),
      take(1),
      flatMap(([currentUser, candidateSearchFilter]) => {
        return this.candidateSearchProfilesRepository.create(<CreateCandidateSearchProfile>{
          name: this.form.get('name').value,
          ownerUserId: currentUser.id,
          searchFilter: this.candidateSearchProfileService.mapToRequest(candidateSearchFilter),
        })
          .pipe(
            catchError(error => {
              if (error.error.type) {

                if (error.error.type === SearchProfileErrors.PROFILE_ALREADY_EXISTS) {
                  this.form.get('name').setErrors({ nameAlreadyExists: true });
                  return EMPTY;
                }
              }
              return throwError(error);
            })
          );
      })
    )
      .subscribe(searchProfile => {
        this.notificationsService.success('portal.candidate-search-profiles.notification.profile-saved');
        this.activeModal.close(searchProfile);
      });
  }

  onCancel() {
    this.activeModal.dismiss();
  }

}
