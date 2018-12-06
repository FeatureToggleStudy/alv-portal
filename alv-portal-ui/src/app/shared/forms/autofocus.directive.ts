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
      this.el.nativeElement.focus();
    }
  }

}
