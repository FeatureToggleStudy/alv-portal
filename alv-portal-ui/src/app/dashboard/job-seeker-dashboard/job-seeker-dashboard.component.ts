import { Component, OnInit } from '@angular/core';
import {
  LinkPanelData,
  LinksRepository
} from '../../shared/layout/link-panel/links-repository';
import { I18nService } from '../../core/i18n.service';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'alv-job-seeker-dashboard',
  templateUrl: './job-seeker-dashboard.component.html',
  styleUrls: ['./job-seeker-dashboard.component.scss']
})
export class JobSeekerDashboardComponent implements OnInit {
  linksData$: Observable<LinkPanelData>;


  constructor(private linksRepository: LinksRepository) {
    this.linksData$ = this.linksRepository.getLinks('dashboard/job-seeker/');
  }

  ngOnInit() {
  }

}
