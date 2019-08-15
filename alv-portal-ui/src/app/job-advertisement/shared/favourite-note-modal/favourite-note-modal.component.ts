import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { FavouriteItem } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobAdFavouritesRepository } from '../../../shared/backend-services/favourites/job-ad-favourites.repository';
import { NotificationsService } from '../../../core/notifications.service';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'alv-favourite-note-modal',
  templateUrl: './favourite-note-modal.component.html',
  styleUrls: ['./favourite-note-modal.component.scss'],
})
export class FavouriteNoteModalComponent extends AbstractSubscriber implements OnInit {

  form: FormGroup;

  @Input() jobAdvertisementId: string;

  @Input() favouriteItem: FavouriteItem;

  isCreateNote: boolean;

  loadingSubscription: Subscription;

  readonly MAX_LENGTH_1000 = 1000;

  constructor(public activeModal: NgbActiveModal,
              private jobAdFavouritesRepository: JobAdFavouritesRepository,
              private modalService: ModalService,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private notificationsService: NotificationsService) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      note: [this.favouriteItem ? this.favouriteItem.note : '', [Validators.required, Validators.maxLength(this.MAX_LENGTH_1000)]]
    });

    this.isCreateNote = !this.favouriteItem || !this.favouriteItem.note;
  }

  onSubmit() {
    if (this.favouriteItem) {
      this.loadingSubscription = this.jobAdFavouritesRepository.editNote(this.favouriteItem, this.form.value.note)
        .subscribe((updatedFavouriteItem) => {
          this.activeModal.close(updatedFavouriteItem);
          this.notificationsService.success('portal.job-ad-favourites.notification.favourite-note-saved');
        });
    } else {
      this.loadingSubscription = this.authenticationService.getCurrentUser().pipe(
        switchMap(currentUser => {
          return this.jobAdFavouritesRepository.addFavourite(this.jobAdvertisementId, currentUser.id, this.form.value.note);
        }),
        takeUntil(this.ngUnsubscribe)
      ).subscribe(favouriteItem => {
        this.activeModal.close(favouriteItem);
        this.notificationsService.success('portal.job-ad-favourites.notification.favourite-note-added');
      });
    }
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onDelete() {
    this.jobAdFavouritesRepository.editNote(this.favouriteItem, '')
      .subscribe((updatedFavouriteItem) => {
        this.activeModal.close(updatedFavouriteItem);
        this.notificationsService.success('portal.job-ad-favourites.notification.favourite-note-removed');
      });
  }
}
