import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LinkPanelData, LinksRepository } from '../../shared/layout/link-panel/links-repository';

@Component({
  selector: 'alv-pav-home',
  templateUrl: './pav-home.component.html',
  styleUrls: ['./pav-home.component.scss']
})
export class PavHomeComponent implements OnInit {

  form: FormGroup;
  linksData$: Observable<LinkPanelData>;


  constructor(private fb: FormBuilder,
              private linksRepository: LinksRepository) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      occupations: this.fb.control(''),
      skills: this.fb.control(''),
      location: this.fb.control('')
    });
    this.linksData$ = this.linksRepository.getLinks('home/pav/');

  }
}
