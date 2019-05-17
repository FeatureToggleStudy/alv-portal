import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobAdSearchProfilesRepository } from '../../../../shared/backend-services/job-ad-search-profiles/job-ad-search-profiles.repository';
import { NotificationsService } from '../../../../core/notifications.service';
import { select, Store } from '@ngrx/store';
import { getJobSearchFilter, JobAdSearchState } from '../../state-management/state';
import { flatMap, take } from 'rxjs/operators';
import { JobSearchProfileService } from '../job-search-profile.service';
import { ResolvedJobAdSearchProfile } from '../../../../shared/backend-services/job-ad-search-profiles/job-ad-search-profiles.types';

@Component({
  selector: 'alv-update-search-profile-modal',
  templateUrl: './update-search-profile-modal.component.html',
  styleUrls: ['./update-search-profile-modal.component.scss']
})
export class UpdateSearchProfileModalComponent {

  searchProfile: ResolvedJobAdSearchProfile;

  constructor(public activeModal: NgbActiveModal,
              private store: Store<JobAdSearchState>,
              private jobAdSearchProfilesRepository: JobAdSearchProfilesRepository,
              private jobSearchProfileService: JobSearchProfileService,
              private notificationsService: NotificationsService) {
  }

  onUpdateExisting() {
    this.store.pipe(
      select(getJobSearchFilter),
      take(1),
      flatMap(searchFilter => {
        return this.jobAdSearchProfilesRepository.update(this.searchProfile.id, {
          name: this.searchProfile.name,
          searchFilter: this.jobSearchProfileService.mapToRequest(searchFilter)
        });
      })
    ).subscribe(updatedSearchProfile => {
      this.notificationsService.success('portal.job-ad-search-profiles.notification.profile-updated');
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
