import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alv-save-search-profile-modal',
  templateUrl: './save-search-profile-modal.component.html',
  styleUrls: ['./save-search-profile-modal.component.scss']
})
export class SaveSearchProfileModalComponent implements OnInit {

  readonly MAX_LENGTH_50 = 50;

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSubmit()  {

  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
