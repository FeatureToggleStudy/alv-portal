import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'alv-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: ['./navigation-container.component.scss']
})
export class NavigationContainerComponent implements OnInit {

  @HostBinding('class') readonly class = 'd-block d-md-flex';

  constructor() { }

  ngOnInit() {
  }

}
