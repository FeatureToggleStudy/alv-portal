import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { FavouriteItem } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobAdFavouritesRepository } from '../../../shared/backend-services/favourites/job-ad-favourites.repository';


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

  readonly MAX_LENGTH_1000 = 1000;

  constructor(public activeModal: NgbActiveModal,
              private jobAdFavouritesRepository: JobAdFavouritesRepository,
              private modalService: ModalService,
              private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      note: [this.favouriteItem ? this.favouriteItem.note : '', [Validators.maxLength(this.MAX_LENGTH_1000)]]
    });

    this.isCreateNote = !this.favouriteItem || !this.favouriteItem.note;
  }

  onSubmit() {
    if (this.favouriteItem) {
      this.jobAdFavouritesRepository.editNote(this.favouriteItem, this.form.value.note)
        .subscribe(() => {
          this.favouriteItem.note = this.form.value.note;
          this.activeModal.close(this.favouriteItem);
        });
    } else {
      this.jobAdFavouritesRepository.createNote(this.jobAdvertisementId, this.form.value.note)
        .subscribe(favouriteItem => {
          this.activeModal.close(favouriteItem);
        });
    }
  }

  onCancel() {
    if (this.isCreateNote) {
      this.activeModal.dismiss();
    } else {
      this.jobAdFavouritesRepository.editNote(this.favouriteItem, '')
        .subscribe(() => {
          this.favouriteItem.note = '';
          this.activeModal.close(this.favouriteItem);
        });
    }

  }

}
