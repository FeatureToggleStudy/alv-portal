import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alv-three-column-layout',
  templateUrl: './three-column-layout.component.html',
  styleUrls: ['./three-column-layout.component.scss']
})
export class ThreeColumnLayoutComponent implements OnInit {

  @Input() mobileOrdering: number[];

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
    document.querySelectorAll('.side-panel').forEach(sidePanel => {
      sidePanel.setAttribute('style', `height: ${document.querySelector('main').clientHeight - 100}px`);
    });
  }
}
