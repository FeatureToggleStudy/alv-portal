import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'alv-competence-item-placeholder',
  templateUrl: './competence-item-placeholder.component.html',
  styleUrls: ['./competence-item-placeholder.component.scss']
})
export class CompetenceItemPlaceholderComponent implements OnInit {

  @Input()
  mainText: string;
  @Input()
  showErrors: boolean;
  @Input()
  icon: IconProp;
  @Output()
  clickHandler = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
