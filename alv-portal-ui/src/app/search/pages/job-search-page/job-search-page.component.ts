import { Component, OnInit } from '@angular/core';
import { resultListItemMock } from '../../components/result-list-item/result-list-item.model';

@Component({
  selector: 'alv-job-search-page',
  templateUrl: './job-search-page.component.html',
  styleUrls: ['./job-search-page.component.scss']
})
export class JobSearchPageComponent implements OnInit {

  resultListItemMock = resultListItemMock;
  constructor() {
  }

  ngOnInit() {
  }

}
