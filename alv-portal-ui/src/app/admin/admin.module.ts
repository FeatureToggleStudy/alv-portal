import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoBadgesMapperService } from './user-info/user-info-badges-mapper.service';
import { LegalTermsManagementComponent } from './legal-terms-management/legal-terms-management.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
      UserInfoComponent,
      LegalTermsManagementComponent
  ],
  providers: [
      UserInfoBadgesMapperService
  ]
})
export class AdminModule {
}
