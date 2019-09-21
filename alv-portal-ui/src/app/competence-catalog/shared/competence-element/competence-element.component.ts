import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompetenceElement } from '../../../shared/backend-services/competence-element/competence-element.types';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { CompetenceElementModalComponent } from '../../competence-elements/competence-element-modal/competence-element-modal.component';
import { Observable } from 'rxjs';
import { I18nService } from '../../../core/i18n.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'alv-competence-element',
  templateUrl: './competence-element.component.html',
  styleUrls: ['./competence-element.component.scss']
})
export class CompetenceElementComponent implements OnInit {

  @Input() competenceElement: CompetenceElement;

  @Output() elementClick = new EventEmitter<CompetenceElement>();

  description$: Observable<string>;

  constructor(private i18nService: I18nService) { }

  ngOnInit() {
    this.description$ = this.i18nService.currentLanguage$.pipe(
      map(lang => this.competenceElement.description[`text${lang[0].toUpperCase()}${lang[1]}`] || `<placeholder-${lang}>`)
    );
  }

  onElementClick() {
    this.elementClick.emit(this.competenceElement);
  }
}
