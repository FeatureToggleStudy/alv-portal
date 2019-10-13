import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-ch-fiche-title-modal',
  templateUrl: './ch-fiche-title-modal.component.html',
  styleUrls: ['./ch-fiche-title-modal.component.scss']
})
export class ChFicheTitleModalComponent implements OnInit {

  form: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
