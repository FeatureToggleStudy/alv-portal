import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { I18nService } from '../../../../core/i18n.service';
import { TranslatedString } from '../../../shared/shared-competence-catalog.types';
import { IconKey } from '../../../../shared/icons/custom-icon/custom-icon.component';

@Component({
  selector: 'alv-ch-fiche-title',
  templateUrl: './ch-fiche-title.component.html',
  styleUrls: ['./ch-fiche-title.component.scss']
})
export class ChFicheTitleComponent implements OnInit {

  @Output()
  editTitle = new EventEmitter();

  @Input()
  ficheId: string;
  @Input()
  showErrors: boolean;
  @Input()
  ficheTitle: TranslatedString;

  IconKey = IconKey;


  constructor(private i18nService: I18nService) {
  }

  ngOnInit() {
  }

  onEditTitle() {
    this.editTitle.emit();
  }

}
