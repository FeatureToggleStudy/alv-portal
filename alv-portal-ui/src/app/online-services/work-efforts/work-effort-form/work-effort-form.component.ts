import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { atLeastOneRequiredValidator } from '../../../shared/forms/input/validators/at-least-one-required.validator';
import { PostAddressFormValue } from '../../../job-advertisement/job-publication/job-publication-form/post-address-form/post-address-form-value.types';
import { Notification, NotificationType } from '../../../shared/layout/notifications/notification.model';

@Component({
  selector: 'alv-work-effort-form',
  templateUrl: './work-effort-form.component.html',
  styleUrls: ['./work-effort-form.component.scss']
})
export class WorkEffortFormComponent implements OnInit {

  formGroup: FormGroup;

  bottomAlert: Notification = {
    isSticky: true,
    type: NotificationType.WARNING,
    messageKey: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.'
  };

  postAddressFormValue: PostAddressFormValue = {
    countryIsoCode: 'ch',
    houseNumber: 'aa',
    name: 'mimcaom',
    postOfficeBoxNumberOrStreet: {
      street: 'string'
    },
    zipAndCity: {
      city: 'Lausanne',
      zipCode: '29092'
    }

  };

  constructor(private fb: FormBuilder) {


  }


  ngOnInit() {

    this.formGroup = this.fb.group({
      date: [''],
      onlineCheckbox: [false],
      mailCheckbox: [false],
      personallyCheckbox: [false],
      phoneCheckbox: [false],
      address: this.fb.group({
          name: ['name'],
          houseNumber: [''],
          countryIsoCode: [''],
          postOfficeBoxNumberOrStreet: [''],
        },
        {
          validator: [atLeastOneRequiredValidator(['street', 'postOfficeBoxNumber'])]
        }
      ),
      email: [''],
      url: [''],
      phone: [''],
      occupation: [''],
      ravJobCheckBox: [false],
      workload: [''],
      result: ['']


    });
  }

  submit() {

  }

}
