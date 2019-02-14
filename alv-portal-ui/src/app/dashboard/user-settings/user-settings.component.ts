import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CompanyContactTemplateModel } from '../../core/auth/company-contact-template-model';
import { User } from '../../core/auth/user.model';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Salutation } from '../../shared/backend-services/shared.types';

export interface ContactFormValue {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface CompanyFormValue {
  companyName: string;
  companyStreet: string;
  companyHouseNr: string;
  companyZipCode: string;
  companyCity: string;
}

@Component({
  selector: 'alv-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent extends AbstractSubscriber implements OnInit {

  currentUser: User;

  currentCompany: CompanyContactTemplateModel;

  constructor(private authenticationService: AuthenticationService,
              @Inject(DOCUMENT) private document: any) {
    super();
  }

  ngOnInit() {

    this.authenticationService.getCurrentUser().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(user => this.currentUser = user);

    this.authenticationService.getCurrentCompany().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(currentCompany => {
      this.currentCompany = currentCompany;
      // set initial values to form - user and company info!
    });
  }

  goToEIAMProfile() {
    this.document.location.href = '/authentication/profile';
  }

}
