import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
// Angular animations have problems with animating the transition between display:none and display:block, so we couldn't
// implement the animation the simple way. Instead, the following hack was used:
// 1. We only collapse to 1 px, so that no optimizer can remove the panel content from the DOM
// 2. We use overflow:hidden on a .panel-content container so that when it shrinks, the elements inside are not shown - in css
// 3.We use min-height: 0 on a .panel-content container to allow schrinking on IE - in css
// 3. the rest is done in animations below. We purposefully remove paddings on collapsed, because otherwise the top of the first
// element will be visible inside the closed panel.
// If you think that you find simpler way to collapsing, please test it thoroughly with IE and Safari.
@Component({
  selector: 'alv-collapse-panel',
  templateUrl: './collapse-panel.component.html',
  styleUrls: ['./collapse-panel.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        display: 'block',
        'max-height': '100%',
        transform: 'scaleY(1)',
        opacity: 1
      })),
      state('closed', style({
        display: 'none',
        height: 0,
        'max-height': 0,
        transform: 'scaleY(0)',
        opacity: 0
      })),
      transition('* <=> *', [animate('200ms')])
    ])
  ]
})
export class CollapsePanelComponent {

  @Input() panelId: string;

  @Input() panelTitle: string;

  @Input()
  isCollapsed = false;

  @Output()
  collapsed = new EventEmitter<boolean>(); // true if isCollapsed===true

  @Input()
  isAlwaysExpanded = false;

  toggle() {
    this.isCollapsed ? this.expand() : this.collapse();
  }

  expand() {
    this.isCollapsed = false;
    this.emitCollapseEvent();
  }

  collapse() {
    this.isCollapsed = true;
    this.emitCollapseEvent();
  }

  private emitCollapseEvent() {
    this.collapsed.emit(this.isCollapsed);
  }
}
