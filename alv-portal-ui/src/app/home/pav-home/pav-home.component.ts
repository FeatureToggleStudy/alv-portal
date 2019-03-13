import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { I18nService } from '../../core/i18n.service';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  LinkPanelData,
  LinksRepository
} from '../../shared/layout/link-panel/links-repository';

@Component({
  selector: 'alv-pav-home',
  templateUrl: './pav-home.component.html',
  styleUrls: ['./pav-home.component.scss']
})
export class PavHomeComponent implements OnInit {

  form: FormGroup;
  linksData$: Observable<LinkPanelData>;


  constructor(private fb: FormBuilder,
              private linksRepository: LinksRepository,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      occupations: this.fb.control(''),
      skills: this.fb.control(''),
      location: this.fb.control('')
    });
    this.linksData$ = this.i18nService.currentLanguage$.pipe(
      flatMap((language) => this.linksRepository.getLinks(language, 'home/pav/anon/')));
  }
}
