import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {
    path: 'user-info',
    component: UserInfoComponent,
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
