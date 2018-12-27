import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'alv-three-column-layout',
  templateUrl: './three-column-layout.component.html',
  styleUrls: ['./three-column-layout.component.scss']
})
export class ThreeColumnLayoutComponent implements OnInit, OnDestroy {

  /**
   * Redefines the column ordering for mobile. e.g. [1, 3, 2] will display the third
   * column as the second column on mobile.
   */
  @Input() mobileOrdering = [1, 2, 3];

  /**
   * This value indicates the top margin of the component in pixels within the <main>
   * element. It's needed for proper sticky positioning.
   */
  @Input() stickyTop = 0;

  /**
   * This is the small (sm) breakpoint copied from the bootstrap 4 library
   */
  private readonly BOOTSTRAP_BREAKPOINT_SM = '(max-width: 767.98px)';

  /**
   * This value equals to number 4 of the bootstrap default sizes (e.g. .mt-md-4, .m-4, etc.)
   */
  private readonly BOOTSTRAP_SIZE_4 = '1.5rem';

  constructor() {
  }

  ngOnInit() {
    window.addEventListener('resize', this.setSidePanelHeight.bind(this));
    this.setSidePanelHeight();
  }

  getColumnClass(columnIndex) {
    if (this.mobileOrdering[columnIndex] == null) {
      return 'd-none d-md-block';
    }
    return 'order-' + this.mobileOrdering[columnIndex];
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.setSidePanelHeight.bind(this));
  }

  private setSidePanelHeight() {
    const mainContainer = document.querySelector('main');
    const isMobileViewPort = window.matchMedia(this.BOOTSTRAP_BREAKPOINT_SM);

    document.querySelectorAll('alv-three-column-layout .side-panel').forEach(sidePanel => {
      if (isMobileViewPort.matches) {
        sidePanel.setAttribute('style', '');
      } else {
        sidePanel.setAttribute('style',
          `height: calc(${mainContainer.clientHeight - this.stickyTop}px - ${this.BOOTSTRAP_SIZE_4});
                 top: calc(${this.BOOTSTRAP_SIZE_4} + ${this.stickyTop}px)`);
      }
    });
  }
}
