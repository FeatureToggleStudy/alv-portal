import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppContextEalvDirective } from './app-context-ealv.directive';


@NgModule({
  declarations: [
    AppContextEalvDirective
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [],
  exports: [
    AppContextEalvDirective
  ],
  providers: []
})
export class SharedAppContextModule {
}

