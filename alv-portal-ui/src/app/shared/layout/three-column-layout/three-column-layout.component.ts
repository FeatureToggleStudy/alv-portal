import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alv-three-column-layout',
  templateUrl: './three-column-layout.component.html',
  styleUrls: ['./three-column-layout.component.scss']
})
export class ThreeColumnLayoutComponent implements OnInit {

  @Input() mobileOrdering: number[];

  @Input() stickyTop = 0;

  private readonly BOOTSTRAP_BREAKPOINT_SM = 576;

  constructor() {
  }

  ngOnInit() {
    if (!this.mobileOrdering) {
      this.mobileOrdering = [1, 2, 3];
    }
    this.setSidePanelHeight();
    this.listenToWindowResize();
  }

  getColumnClass(columnIndex) {
    if (this.mobileOrdering[columnIndex] == null) {
      return 'd-none d-md-block';
    }
    return 'order-' + this.mobileOrdering[columnIndex];
  }

  private listenToWindowResize() {
    window.addEventListener('resize', (event) => {
      this.setSidePanelHeight();
    });
  }

  private setSidePanelHeight() {
    const mainContainer = document.querySelector('main');
    const marginTop = '1.5rem';
    document.querySelectorAll('alv-three-column-layout .side-panel').forEach(sidePanel => {
      if (mainContainer.clientWidth > this.BOOTSTRAP_BREAKPOINT_SM) {
        sidePanel.setAttribute('style',
          `height: calc(${mainContainer.clientHeight - this.stickyTop}px - ${marginTop});
                 top: calc(${marginTop} + ${this.stickyTop}px)`);

      } else {
        sidePanel.setAttribute('style', '');
      }
    });
  }
}
