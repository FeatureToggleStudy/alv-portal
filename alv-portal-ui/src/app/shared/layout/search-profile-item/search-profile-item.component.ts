import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchProfile } from '../../backend-services/shared.types';

@Component({
  selector: 'alv-search-profile-item',
  templateUrl: './search-profile-item.component.html',
  styleUrls: ['./search-profile-item.component.scss']
})
export class SearchProfileItemComponent implements OnInit {

  @Input() searchProfile: SearchProfile;

  @Output() deleted = new EventEmitter<SearchProfile>();

  constructor() {
  }

  ngOnInit() {
  }

  deleteProfile(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.deleted.emit(this.searchProfile);
  }

}
