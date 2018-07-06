import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  entryComponents: [],
  exports: [
    NotificationComponent,
  ],
  providers: []
})
export class SharedModule {
}


