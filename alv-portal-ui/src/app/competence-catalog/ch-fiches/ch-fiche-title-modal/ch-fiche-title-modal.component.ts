import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-ch-fiche-title-modal',
  templateUrl: './ch-fiche-title-modal.component.html',
  styleUrls: ['./ch-fiche-title-modal.component.scss']
})
export class ChFicheTitleModalComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      textDe: [''],
      textFr: [''],
      textIt: [''],
      textEn: ['']
    });
  }

  cancel() {

  }

  submit() {

  }
}
