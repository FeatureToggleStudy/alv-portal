import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AvpInfoComponent} from './forms/avp-info/avp-info.component';

const appRoutes: Routes = [
  {
    path: 'avp-info',
    component: AvpInfoComponent
  },
  {
    path: '**',
    redirectTo: 'avp-info'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
        appRoutes,
        {enableTracing: false}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
