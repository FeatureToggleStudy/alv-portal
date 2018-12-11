import { Component, Input, OnInit } from '@angular/core';
import {
  ApplyChannel,
  ApplyChannelPostAddress
} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { I18nService } from '../../../core/i18n.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'alv-apply-channel-post-address',
  templateUrl: './apply-channel-post-address.component.html'
})
export class ApplyChannelPostAddressComponent implements OnInit {

  @Input()
  applyChannel: ApplyChannel;

  result$: Observable<string>;

  constructor(private i18nService: I18nService) {
  }

  ngOnInit() {
    if (this.applyChannel.postAddress) {
      this.result$ = this.formatPostAddress(this.applyChannel.postAddress);
    } else if (this.applyChannel.rawPostAddress) {
      this.result$ = of(this.applyChannel.rawPostAddress);
    }
  }

  private formatPostAddress(address: ApplyChannelPostAddress): Observable<string> {
    return this.i18nService.get('home.tools.job-publication.company.postbox').pipe(
      map((postBoxLabel) => {
        let result = address.name;
        if (address.postOfficeBoxNumber) {
          result += ', ' + postBoxLabel + ' ' + address.postOfficeBoxNumber;
          result += ', ' + address.postOfficeBoxPostalCode + ' ' + address.postOfficeBoxCity;
        } else {
          if (address.street) {
            result += ', ' + address.street;
          }
          if (address.houseNumber) {
            result += ' ' + address.houseNumber;
          }
          result += ', ' + address.postalCode + ' ' + address.city;
        }
        return result;
      })
    )
  }
}
