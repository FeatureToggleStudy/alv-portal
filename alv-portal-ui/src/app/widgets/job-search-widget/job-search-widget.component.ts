import { Component, OnInit } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { JobQueryPanelValues } from './job-query-panel/job-query-panel-values';
import { Router } from '@angular/router';

@Component({
  selector: 'alv-job-search-widget',
  templateUrl: './job-search-widget.component.html',
  styleUrls: ['./job-search-widget.component.scss']
})
export class JobSearchWidgetComponent extends AbstractSubscriber implements OnInit {


  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
  }

  public onSearchSubmit(jobQueryPanelValues: JobQueryPanelValues) {
    this.router.navigate(['job-search'], {
      queryParams: {
        'query-values': JSON.stringify(jobQueryPanelValues)
      }
    });
  }

}
