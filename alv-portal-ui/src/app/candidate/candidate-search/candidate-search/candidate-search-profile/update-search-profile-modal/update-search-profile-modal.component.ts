import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { flatMap, take } from 'rxjs/operators';
import { CandidateSearchProfileService } from '../candidate-search-profile.service';
import { ResolvedCandidateSearchProfile } from '../../../../../shared/backend-services/candidate-search-profiles/candidate-search-profiles.types';
import {
  CandidateSearchState,
  getCandidateSearchFilter
} from '../../../state-management/state';
import { CandidateSearchProfilesRepository } from '../../../../../shared/backend-services/candidate-search-profiles/candidate-search-profiles.repository';
import { NotificationsService } from '../../../../../core/notifications.service';

@Component({
  selector: 'alv-update-search-profile-modal',
  templateUrl: './update-search-profile-modal.component.html',
  styleUrls: ['./update-search-profile-modal.component.scss']
})
export class UpdateSearchProfileModalComponent {

  searchProfile: ResolvedCandidateSearchProfile;

  constructor(public activeModal: NgbActiveModal,
              private store: Store<CandidateSearchState>,
              private candidateSearchProfilesRepository: CandidateSearchProfilesRepository,
              private candidateSearchProfileService: CandidateSearchProfileService,
              private notificationsService: NotificationsService) {
  }

  onUpdateExisting() {
    this.store.pipe(
      select(getCandidateSearchFilter),
      take(1),
      flatMap(searchFilter => {
        return this.candidateSearchProfilesRepository.update(this.searchProfile.id, {
          name: this.searchProfile.name,
          searchFilter: this.candidateSearchProfileService.mapToRequest(searchFilter)
        });
      })
    ).subscribe(updatedSearchProfile => {
      this.notificationsService.success('portal.candidate-search-profiles.notification.profile-updated');
      this.activeModal.close(updatedSearchProfile);
    });
  }

  onCreateNew() {
    this.activeModal.close();
  }

  onCancel() {
    this.activeModal.dismiss();
  }

}
