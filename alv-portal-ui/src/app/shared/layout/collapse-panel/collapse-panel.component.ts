import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

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

  @Input()
  isAlwaysExpanded = false;

  toggle() {
    if (!this.isAlwaysExpanded) {
      this.isCollapsed = !this.isCollapsed;
    } else {
      this.expand();
    }
  }

  expand() {
    this.isCollapsed = false;
  }

  collapse() {
    if (!this.isAlwaysExpanded) {
      this.isCollapsed = true;
    }
  }
}
