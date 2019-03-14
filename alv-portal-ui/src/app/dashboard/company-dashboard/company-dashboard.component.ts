import { Component, OnInit } from '@angular/core';
import { LinkPanelData, LinksRepository } from '../../shared/layout/link-panel/links-repository';
import { Observable } from 'rxjs';

@Component({
  selector: 'alv-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  linksData$: Observable<LinkPanelData>;

  constructor(private linksRepository: LinksRepository) {
  }

  ngOnInit() {
    this.linksData$ = this.linksRepository.getLinks('dashboard/company/');
  }
}
