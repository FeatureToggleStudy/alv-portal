import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fas as fasPro } from '@fortawesome/pro-solid-svg-icons';
import { SvgFixingDirective } from './svg-fixing.directive';
import { CustomIconComponent } from './custom-icon/custom-icon.component';

library.add(far);
library.add(fas);
library.add(fasPro);

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
}
