import { Component, Input, OnInit } from '@angular/core';
import { CompanyAddress } from '../../backend-services/uid-search/uid.types';

@Component({
  selector: 'alv-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input()
  unstructredAddress: string; //a fallback address which is used only if there's no structured address given

  @Input()
  address: CompanyAddress;

  constructor() {
  }

  ngOnInit() {
  }

}
