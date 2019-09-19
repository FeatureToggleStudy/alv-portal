import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SvgFixingDirective } from './svg-fixing.directive';
import { CustomIconComponent } from './custom-icon/custom-icon.component';
import { IconLibraryService } from '../../core/icon-library.service';

@NgModule({
  declarations: [
    SvgFixingDirective,
    CustomIconComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    SvgFixingDirective,
    CustomIconComponent,
    FontAwesomeModule
  ]
})
export class IconsModule {
  constructor(library: FaIconLibrary, iconLibraryService: IconLibraryService) {
    iconLibraryService.init();
  }
}
