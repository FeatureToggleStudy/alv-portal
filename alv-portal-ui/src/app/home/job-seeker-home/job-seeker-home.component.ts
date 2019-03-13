import { Component, OnInit } from '@angular/core';
import {
  LinkPanelData,
  LinksRepository
} from '../../shared/layout/link-panel/links-repository';
import { Observable } from 'rxjs';

@Component({
  selector: 'alv-job-seeker-home',
  templateUrl: './job-seeker-home.component.html',
  styleUrls: ['./job-seeker-home.component.scss']
})
export class JobSeekerHomeComponent implements OnInit {

  linksData$: Observable<LinkPanelData>;

  constructor(private linksRepository: LinksRepository) {

  }

  ngOnInit() {
    this.linksData$ = this.linksRepository.getLinks('home/job-seeker/');
  }
}
