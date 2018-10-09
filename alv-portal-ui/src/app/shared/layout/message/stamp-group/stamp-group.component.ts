import { Component } from '@angular/core';

/**
 *  Component for grouping stamps, e.g.
 *  <alv-stamp-group>
 *    <alv-stamp
 *      type="warning"
 *      message="First stamp!">
 *    </alv-stamp>
 *    <alv-stamp
 *      type="error"
 *      message="Second stamp!">
 *    </alv-stamp>
 *  </alv-stamp-group>
 */
@Component({
  selector: 'alv-stamp-group',
  templateUrl: './stamp-group.component.html',
  styleUrls: ['./stamp-group.component.scss']
})
export class StampGroupComponent {

  constructor() {
  }

}
