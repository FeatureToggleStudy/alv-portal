import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'online-forms',
    loadChildren: './online-forms/online-forms.module#OnlineFormsModule'
  },
  {
    path: '**',
    redirectTo: 'online-forms'
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
