import { Component, Input, OnInit } from '@angular/core';
import { InlineBadge } from './inline-badge.types';

@Component({
  selector: 'alv-inline-badges',
  templateUrl: './inline-badges.component.html',
  styleUrls: ['./inline-badges.component.scss']
})
export class InlineBadgesComponent implements OnInit {

  @Input()
  badges: InlineBadge[];

  constructor() {
  }

  ngOnInit() {
  }

}
