import { Component, OnInit } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';

@Component({
  selector: 'alv-job-search-widget',
  templateUrl: './job-search-widget.component.html',
  styleUrls: ['./job-search-widget.component.scss']
})
export class JobSearchWidgetComponent extends AbstractSubscriber implements OnInit {

  ngOnInit(): void {
  }

  public onQueryChanged() {
    // Routing
  }

}
