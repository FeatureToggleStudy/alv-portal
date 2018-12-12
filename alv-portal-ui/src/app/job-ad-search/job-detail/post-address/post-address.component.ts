import { Component, Input, OnInit } from '@angular/core';
import { PostAddress } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

@Component({
  selector: 'alv-post-address',
  templateUrl: './post-address.component.html'
})
export class PostAddressComponent implements OnInit {

  @Input()
  address: PostAddress;

  @Input()
  unstructuredAddress: string;

  constructor() {
  }

  ngOnInit() {
  }

}
