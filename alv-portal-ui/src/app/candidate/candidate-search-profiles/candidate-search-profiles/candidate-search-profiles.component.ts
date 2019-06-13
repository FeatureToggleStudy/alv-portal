import { Component, OnInit } from '@angular/core';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';
import { CandidateSearchProfileResult } from '../../../shared/backend-services/candidate-search-profiles/candidate-search-profiles.types';
import { flatMap, map, take } from 'rxjs/operators';
import { SearchProfile } from '../../../shared/backend-services/shared.types';
import { getDeleteConfirmModalConfig } from '../../../shared/job-search-profiles/modal-config.types';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { NotificationsService } from '../../../core/notifications.service';
import { CandidateSearchProfilesRepository } from '../../../shared/backend-services/candidate-search-profiles/candidate-search-profiles.repository';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'alv-candidate-search-profiles',
  templateUrl: './candidate-search-profiles.component.html',
  styleUrls: ['./candidate-search-profiles.component.scss'],
  animations: [
    trigger('removeProfile', [
      transition(':leave', [
        animate('0.25s ease-in', keyframes([
          style({
            transformOrigin: 'top',
            transform: 'scaleY(1)',
            opacity: 1,
            maxHeight: '50px'
          }),
          style({
            transform: 'scaleY(0)',
            opacity: 0,
            maxHeight: 0
          })
        ]))
      ])
    ]),
  ]
})
export class CandidateSearchProfilesComponent implements OnInit {

  IconKey = IconKey;

  candidateSearchProfiles: CandidateSearchProfileResult[];

  private page = 0;

  private readonly size = 100;

  constructor(private candidateSearchProfilesRepository: CandidateSearchProfilesRepository,
              private authenticationService: AuthenticationService,
              private modalService: ModalService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.onScroll();
  }


  onScroll() {
    this.authenticationService.getCurrentUser().pipe(
      take(1),
      flatMap(user => this.candidateSearchProfilesRepository.search(user.id, this.page++, this.size)),
      map(response => response.result)
    ).subscribe(profiles => {
      this.candidateSearchProfiles = [...(this.candidateSearchProfiles || []), ...profiles];
    });
  }

  onDeleteProfile(profile: SearchProfile) {
    this.modalService.openConfirm(
      getDeleteConfirmModalConfig(profile.name)
    ).result
      .then(result => {
        this.candidateSearchProfilesRepository.delete(profile.id)
          .subscribe(() => {
            this.notificationsService.success('portal.job-ad-search-profiles.notification.profile-deleted');
            this.candidateSearchProfiles.splice(this.candidateSearchProfiles.findIndex(searchProfile => searchProfile.id === profile.id), 1);
          });
      })
      .catch(() => {
      });
  }
}
