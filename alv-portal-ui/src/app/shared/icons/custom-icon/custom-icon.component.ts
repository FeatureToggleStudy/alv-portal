import { Component, Input, OnInit } from '@angular/core';


export enum IconKey {
  JOB_AD_SEARCH,
  JOB_PUBLICATION,
  CANDIDATE_SEARCH,
  MANAGE_JOB_ADS
}

interface IconEntry {
  key: IconKey;
  iconStack: IconStackEntry[];
}

interface IconStackEntry {
  icon: string[];
  transform: string;
  mask: string[];
}

@Component({
  selector: 'alv-custom-icon',
  templateUrl: './custom-icon.component.html',
  styleUrls: ['./custom-icon.component.scss']
})
export class CustomIconComponent implements OnInit {

  readonly ICON_ENTRIES: IconEntry[] = [
    {
      key: IconKey.JOB_PUBLICATION,
      iconStack: [
        {
          icon: ['fas', 'circle'],
          transform: 'shrink-5 down-8 right-4',
          mask: ['fas', 'file']
        },
        {
          icon: ['fas', 'plus'],
          transform: 'shrink-9 down-7.5 right-4',
          mask: null
        }
      ]
    },
    {
      key: IconKey.JOB_AD_SEARCH,
      iconStack: [
        {
          icon: ['fas', 'circle'],
          transform: 'shrink-5 down-8 right-4',
          mask: ['fas', 'file']
        },
        {
          icon: ['fas', 'search'],
          transform: 'shrink-9 down-7.5 right-4',
          mask: null
        }
      ]
    },
    {
      key: IconKey.MANAGE_JOB_ADS,
      iconStack: [
        {
          icon: ['fas', 'circle'],
          transform: 'shrink-5 down-8 right-4',
          mask: ['fas', 'file']
        },
        {
          icon: ['fas', 'pen'],
          transform: 'shrink-9 down-7.5 right-4',
          mask: null
        }
      ]
    },
    {
      key: IconKey.CANDIDATE_SEARCH,
      iconStack: [
        {
          icon: ['fas', 'circle'],
          transform: 'shrink-5 down-8 right-4',
          mask: ['fas', 'user']
        },
        {
          icon: ['fas', 'search'],
          transform: 'shrink-9 down-7.5 right-4',
          mask: null
        }
      ]
    }

  ];

  @Input()
  iconKey: IconKey;

  iconEntry: IconEntry;

  constructor() {
  }

  ngOnInit() {
    this.iconEntry = this.ICON_ENTRIES.find(e => e.key === this.iconKey);
    if (!this.iconEntry) {
      throw Error('No matching icon-entry found for: ' + this.iconKey);
    }
  }

}
