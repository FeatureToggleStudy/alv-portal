import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { GATrackingService } from './g-a-tracking.service';

@Directive({
  selector: '[alvTrackingEvent]'
})
export class GATrackingEventDirective implements AfterViewInit {

  @Input() trackOn: string;
  @Input() action: string;
  @Input() category: string;
  @Input() params: any;

  constructor(private gaTrackingService: GATrackingService,
              private renderer: Renderer2,
              private el: ElementRef) {
  }

  ngAfterViewInit() {
    try {
      this.renderer.listen(this.el.nativeElement, this.trackOn, () => {
        this.gaTrackingService.trackEvent(this.action || this.trackOn, {
          event_category: this.category,
          ...this.params
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

}
