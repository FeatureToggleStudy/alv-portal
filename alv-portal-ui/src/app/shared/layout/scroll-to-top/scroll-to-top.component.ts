import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ScrollService } from '../../../core/scroll.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

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
export class ScrollToTopComponent implements OnInit, OnDestroy {

  hidden = true;

  private onScrollFn = this.onScroll.bind(this);

  constructor(private scrollService: ScrollService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.scrollService.startListenOnScroll(this.onScrollFn);
  }

  ngOnDestroy() {
    this.scrollService.stopListenOnScroll(this.onScrollFn);
  }

  onScroll(event) {
    const wasHidden = this.hidden;
    const target = event.target || event.srcElement;
    this.hidden = target.scrollTop < 200;
    // Only trigger the change detection if something has changed
    if (wasHidden !== this.hidden) {
      this.cdRef.detectChanges();
    }
  }

  scrollToTop() {
    this.scrollService.scrollToTop();
  }
}
