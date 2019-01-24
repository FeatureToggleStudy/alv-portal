import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { BlacklistComponent } from './blacklist/blacklist.component';

const routes: Routes = [
  {
    path: 'user-info',
    component: UserInfoComponent,
  },
  {
    path: 'blacklist',
    component: BlacklistComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {

}
