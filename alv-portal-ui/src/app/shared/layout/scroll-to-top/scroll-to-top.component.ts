import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ScrollService } from '../../../core/scroll.service';

@Component({
  selector: 'alv-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
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
    this.hidden = event.srcElement.scrollTop < 200;
    // Only trigger the change detection if something has changed
    if (wasHidden !== this.hidden) {
      this.cdRef.detectChanges();
    }
  }

  scrollToTop() {
    this.scrollService.scrollToTop();
  }
}
