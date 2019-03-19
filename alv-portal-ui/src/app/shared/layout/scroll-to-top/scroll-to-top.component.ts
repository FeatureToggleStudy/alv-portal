import {
  ChangeDetectorRef,
  Component,
  HostListener, Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ScrollService } from '../../../core/scroll.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { WINDOW } from '../../../core/window.service';

@Component({
  selector: 'alv-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  animations: [
    trigger('insertRemoveButton', [
      transition(':enter', [
        style({
          transform: 'translateY(200px)'
        }),
        animate('0.5s ease-in-out', style({
          transform: 'translateY(0)'
        })),
      ]),
      transition(':leave', [
        animate('0.5s ease-in', keyframes([
          style({
            transform: 'translateX(0%)',
            opacity: 1
          }),
          style({
            transform: 'translateX(150%)',
            opacity: 0.5
          }),
          style({
            opacity: 0
          })
        ]))
      ])
    ])
  ]
})
export class ScrollToTopComponent {

  hidden = true;

  constructor(private scrollService: ScrollService,
              private cdRef: ChangeDetectorRef,
              @Inject(WINDOW) private window: Window) {
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.hidden = this.window.scrollY < 200;
  }

  scrollToTop() {
    this.scrollService.scrollToTop();
  }
}
