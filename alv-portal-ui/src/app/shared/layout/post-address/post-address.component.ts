import { Component, Input, OnInit } from '@angular/core';
import { PostAddress } from '../../backend-services/shared.types';

@Component({
  selector: 'alv-post-address',
  templateUrl: './post-address.component.html'
})
export class PostAddressComponent implements OnInit {

  @Input()
  address: PostAddress;

  constructor() {
  }

  ngOnInit() {
  }

}
