import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { AbstractColumnLayout } from '../abstract-column-layout';

@Component({
  selector: 'alv-two-column-layout',
  templateUrl: './two-column-layout.component.html',
  styleUrls: ['../abstract-column-layout.scss', './two-column-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoColumnLayoutComponent extends AbstractColumnLayout {

  @Input() showLeftColumn = false;

  constructor(private element: ElementRef) {
    super(element);
  }

  getMainColumnClasses(columnIndex: number): string {
    const columnClass = this.showLeftColumn ?
        'col-md-6 col-lg-5 col-xl-4' :
        'col-md-7 col-lg-6 col-xl-5';

    return `${columnClass} ${this.getCommonColumnClasses(columnIndex)}`;
  }
}
