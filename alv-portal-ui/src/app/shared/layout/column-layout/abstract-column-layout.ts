import { AfterViewInit, ElementRef, Input, OnDestroy } from '@angular/core';

export class AbstractColumnLayout implements AfterViewInit, OnDestroy {

  /**
   * Redefines the column ordering for mobile. e.g. [1, 3, 2] will display the third
   * column as the second column on mobile.
   */
  @Input() mobileOrdering = [1, 2, 3];

  /**
   * This value indicates the top margin of the component within the <main>
   * element in pixels. It's needed for proper sticky positioning.
   */
  private _stickyTop = 0;

  @Input() get stickyTop(): number {
    return this._stickyTop;
  }

  set stickyTop(value: number) {
    if (this._stickyTop !== value) {
      this._stickyTop = value;
      this.setSidePanelHeight();
    }
  }

  /**
   * These CSS classes are common to all column layouts
   */
  protected commonColumnClasses = [
    'col-xs-12 alv-print-container px-0', // left column
    'col-xs-12 alv-print-container pt-3 pt-md-4', // main column
    'col-xs-12 px-0' // right column
  ];

  /**
   * This is the small (sm) breakpoint copied from the bootstrap 4 library
   */
  private readonly BOOTSTRAP_BREAKPOINT_SM = '(max-width: 767.98px)';

  private setSidePanelHeightFn = this.setSidePanelHeight.bind(this);

  protected constructor(private hostElement: ElementRef) {
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.setSidePanelHeightFn);
    this.setSidePanelHeight();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.setSidePanelHeightFn);
  }

  getCommonColumnClasses(columnIndex: number): string {
    return `${this.commonColumnClasses[columnIndex]} ${this.getMobileColumnOrderingClass(columnIndex)} order-md-${columnIndex + 1}`;
  }

  private getMobileColumnOrderingClass(columnIndex: number): string {
    if (this.mobileOrdering[columnIndex] == null) {
      return 'd-none d-md-block';
    }
    return `order-${this.mobileOrdering[columnIndex]}`;
  }

  private setSidePanelHeight() {
    const mainContainer = document.querySelector('main');
    const isMobileViewPort = window.matchMedia(this.BOOTSTRAP_BREAKPOINT_SM);

    document.querySelectorAll(this.hostElement.nativeElement.tagName.toLowerCase() + ' .side-panel').forEach(sidePanel => {
      if (isMobileViewPort.matches) {
        sidePanel.setAttribute('style', '');
      } else {
        sidePanel.setAttribute('style',
          `height: ${mainContainer.clientHeight - this._stickyTop}px;
                 top: ${this._stickyTop}px`);
      }
    });
  }
}
