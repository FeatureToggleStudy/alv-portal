import { Component, OnInit } from '@angular/core';
import { IconKey } from '../../shared/icons/custom-icon/custom-icon.component';
import { Observable } from 'rxjs';
import { JobAdSearchProfilesRepository } from '../../shared/backend-services/job-ad-search-profiles/job-ad-search-profiles.repository';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { flatMap, map, take } from 'rxjs/operators';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { NotificationsService } from '../../core/notifications.service';
import { JobAdSearchProfileResult } from '../../shared/backend-services/job-ad-search-profiles/job-ad-search-profiles.types';
import { getJobAdDeleteConfirmModalConfig } from '../../shared/search-profiles/modal-config.types';
import { SearchProfile } from '../../shared/backend-services/shared.types';

@Component({
  selector: 'alv-job-search-profiles-widget',
  templateUrl: './job-search-profiles-widget.component.html',
  styleUrls: ['./job-search-profiles-widget.component.scss']
})
export class JobSearchProfilesWidgetComponent implements OnInit {

  IconKey = IconKey;

  jobSearchProfiles$: Observable<JobAdSearchProfileResult[]>;

  private readonly MAX_DISPLAY_ITEMS = 5;

  constructor(private jobAdSearchProfilesRepository: JobAdSearchProfilesRepository,
              private modalService: ModalService,
              private notificationsService: NotificationsService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.initItems();
  }

  initItems() {
    this.jobSearchProfiles$ = this.authenticationService.getCurrentUser().pipe(
      take(1),
      flatMap(user => this.jobAdSearchProfilesRepository.search(user.id)),
      map(response => {
        return response.result.slice(0, this.MAX_DISPLAY_ITEMS);
      })
    );
  }

  onDeleteProfile(profile: SearchProfile) {
    this.modalService.openConfirm(
      getJobAdDeleteConfirmModalConfig(profile.name)
    ).result
      .then(result => {
        this.jobAdSearchProfilesRepository.delete(profile.id)
          .subscribe(() => {
            this.notificationsService.success('portal.job-ad-search-profiles.notification.profile-deleted');
            this.initItems();
          });
      })
      .catch(() => {
      });
  }

  trackById(profile: JobAdSearchProfileResult): string {
    return profile.id;
  }
}
