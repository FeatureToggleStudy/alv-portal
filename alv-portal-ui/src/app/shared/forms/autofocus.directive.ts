import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[alvAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  @Input('alvAutofocus') autofocus: boolean;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    if (this.autofocus) {
      // The setTimeout is needed in order to make the window not scroll down when
      // a modal window with autofocus is opened.
      setTimeout(() => {
        this.el.nativeElement.focus();
      });
    }
  }

}
