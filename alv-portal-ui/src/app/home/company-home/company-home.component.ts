import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LinkPanelData, LinksRepository } from '../../shared/layout/link-panel/links-repository';

@Component({
  selector: 'alv-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {

  form: FormGroup;

  linksData$: Observable<LinkPanelData>;


  constructor(private fb: FormBuilder,
              private linksRepository: LinksRepository) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: this.fb.control(''),
      duties: this.fb.control('')
    });

    this.linksData$ = this.linksRepository.getLinks('home/company/');
  }
}
