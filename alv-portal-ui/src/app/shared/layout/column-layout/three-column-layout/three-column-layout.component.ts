import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AbstractColumnLayout } from '../abstract-column-layout';

@Component({
  selector: 'alv-three-column-layout',
  templateUrl: './three-column-layout.component.html',
  styleUrls: ['../abstract-column-layout.scss', './three-column-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreeColumnLayoutComponent extends AbstractColumnLayout {

  constructor(private element: ElementRef) {
    super(element);
  }

}
