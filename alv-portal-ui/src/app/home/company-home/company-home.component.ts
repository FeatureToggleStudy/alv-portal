import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  LinkPanelData,
  LinksRepository
} from '../../shared/layout/link-panel/links-repository';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'alv-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {

  form: FormGroup;

  linksData$: Observable<LinkPanelData>;


  constructor(private fb: FormBuilder,
              private linksRepository: LinksRepository,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: this.fb.control(''),
      duties: this.fb.control('')
    });

    this.linksData$ = this.i18nService.currentLanguage$.pipe(
      flatMap((language) => this.linksRepository.getLinks(language, 'home/company/')));
  }
}
