import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TypeaheadItem } from '../../../shared/forms/input/typeahead/typeahead-item';
import { map } from 'rxjs/operators';
import {
  CompetenceElement,
  ElementType
} from '../../../shared/backend-services/competence-element/competence-element.types';
import { CompetenceElementRepository } from '../../../shared/backend-services/competence-element/competence-element.repository';

@Component({
  selector: 'alv-competence-element-search-modal',
  templateUrl: './competence-element-search-modal.component.html',
  styleUrls: ['./competence-element-search-modal.component.scss']
})
export class CompetenceElementSearchModalComponent implements OnInit {

  @Input() elementType: ElementType;

  form: FormGroup;

  searchCompetenceElementsFn = this.searchCompetenceElements.bind(this);

  constructor(private modal: NgbActiveModal,
              private fb: FormBuilder,
              private competenceElementRepository: CompetenceElementRepository) { }

  ngOnInit() {
    this.form = this.fb.group({
      competenceElement: ['', Validators.required],
      description: this.fb.group({
        textDe: [''],
        textFr: [''],
        textIt: [''],
        textEn: ['']
      })
    });
  }

  submit() {
    this.modal.close(this.form.get('competenceElement').value.payload);
  }

  cancel() {
    this.modal.dismiss();
  }

  itemSelected(item: TypeaheadItem<CompetenceElement>) {
    this.form.get('competenceElement').setValue(item);
    this.form.get('description').patchValue(item.payload.description);
  }

  private searchCompetenceElements(term: string): Observable<TypeaheadItem<CompetenceElement>[]> {
    return this.competenceElementRepository.search({page: 0, size: 20, body: {query: term}}).pipe(
      map(competenceElementPage => competenceElementPage.content.filter(item => item.type === this.elementType).map(this.mapToItem))
    );
  }

  private mapToItem(competenceElement: CompetenceElement, index: number): TypeaheadItem<CompetenceElement> {
    return new TypeaheadItem<CompetenceElement>(
      competenceElement.type,
      competenceElement,
      competenceElement.description.textDe,
      index
    );
  }
}
