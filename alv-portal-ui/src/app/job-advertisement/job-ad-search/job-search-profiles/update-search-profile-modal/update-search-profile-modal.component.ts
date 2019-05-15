import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobAdSearchProfile } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobAdSearchProfilesRepository } from '../../../../shared/backend-services/job-ad-search-profiles/job-ad-search-profiles.repository';
import { NotificationsService } from '../../../../core/notifications.service';

@Component({
  selector: 'alv-update-search-profile-modal',
  templateUrl: './update-search-profile-modal.component.html',
  styleUrls: ['./update-search-profile-modal.component.scss']
})
export class UpdateSearchProfileModalComponent {

  searchProfile: JobAdSearchProfile;

  constructor(public activeModal: NgbActiveModal,
              private jobAdSearchProfilesRepository: JobAdSearchProfilesRepository,
              private notificationsService: NotificationsService) {
  }

  onUpdateExisting() {
    // TODO: how to update the search filter?
    this.jobAdSearchProfilesRepository.update(this.searchProfile)
      .subscribe(updatedSearchProfile => {
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
