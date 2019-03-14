import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkPanelData, LinksRepository } from '../../shared/layout/link-panel/links-repository';

@Component({
  selector: 'alv-pav-dashboard',
  templateUrl: './pav-dashboard.component.html',
  styleUrls: ['./pav-dashboard.component.scss']
})
export class PavDashboardComponent implements OnInit {
  linksData$: Observable<LinkPanelData>;

  constructor(private linksRepository: LinksRepository) {
  }

  ngOnInit() {
    this.linksData$ = this.linksRepository.getLinks('dashboard/company/');

  }

}
