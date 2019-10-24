import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompetenceElementFilterValues } from '../../shared/shared-competence-catalog.types';
import { ElementType } from '../../../shared/backend-services/competence-element/competence-element.types';

@Component({
  selector: 'alv-competence-elements-filter-modal',
  templateUrl: './competence-elements-filter-modal.component.html',
  styleUrls: ['./competence-elements-filter-modal.component.scss']
})
export class CompetenceElementsFilterModalComponent implements OnInit {

  form: FormGroup;

  currentFiltering: CompetenceElementFilterValues;

  constructor(private fb: FormBuilder,
              public activeModal: NgbActiveModal) {
  }
/*
  KNOW_HOW = 'KNOW_HOW',
  KNOW_HOW_INDICATOR = 'KNOW_HOW_INDICATOR',
  KNOWLEDGE = 'KNOWLEDGE'
 */
  ngOnInit() {
    const controlsConfig = Object.values(ElementType).reduce((prev, curr, index) => {
      prev[curr] = this.currentFiltering.types.includes(curr);
      return prev;
    }, {});
    console.log(controlsConfig);
    this.form = this.fb.group({
      KNOW_HOW: [this.currentFiltering.types.includes(ElementType.KNOW_HOW)],
      KNOW_HOW_INDICATOR: [this.currentFiltering.types.includes(ElementType.KNOW_HOW_INDICATOR)],
      KNOWLEDGE: [this.currentFiltering.types.includes(ElementType.KNOWLEDGE)]
    });
  }

  filter() {
    const result: CompetenceElementFilterValues = {
      types: this.form.get('period').value
    };
    this.activeModal.close(result);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
