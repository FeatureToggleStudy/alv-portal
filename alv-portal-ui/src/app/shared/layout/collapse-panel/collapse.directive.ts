import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: '[alvCollapse]'
})
export class CollapseDirective extends NgbCollapse implements OnInit {

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    // Suppress animation if the initial state is collapsed
    if (this.collapsed) {
      this.elementRef.nativeElement.style.display = 'none';
      setTimeout(() => {
        this.elementRef.nativeElement.style.display = 'block';
      }, 250);
    }
  }

  @Input()
  set alvCollapse(value: boolean) {
    this.collapsed = value;
  }
}
