import { Component, Host, OnInit, Optional, SkipSelf } from '@angular/core';
import { AsYouType, CountryCode, format, isValidNumber, parse } from 'libphonenumber-js';
import { AbstractInput } from '../abstract-input';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../input-id-generation.service';
import { InputType } from '../input-type.enum';
import { defaultPhoneCountry } from './phone-input.validator';

@Component({
  selector: 'alv-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent extends AbstractInput implements OnInit {

  country: CountryCode = defaultPhoneCountry;

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.PHONE_INPUT, inputIdGenerationService);
  }


  ngOnInit() {
  }

  onInput(event: any) {
    const eventValue = event.target.value;

    if (isValidNumber(eventValue, this.country)) {
      const formatter = new AsYouType(this.country);
      const value = formatter.input(eventValue);
      this.control.patchValue(format(parse(value, this.country), 'International'), {emitEvent: false});
    }
  }

}
