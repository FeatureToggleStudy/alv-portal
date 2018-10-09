import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Component to group panels indicated by a blue stripe on the left.
 * Use the CSS classes "content" and "actions" to place the panels and buttons.
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @example <alv-panel-group [showArrow]="true" [colorizeArrow]="true">
 *            <ng-container class="content">
 *              <alv-panel>
 *                ...
 *              </alv-panel>
 *              <alv-panel [showArrow]="true" [colorizeArrow]="true">
 *                ...
 *              </alv-panel>
 *            </ng-container>
 *            <ng-container class="actions">
 *                <button>...</button>
 *            </ng-container>
 *          </alv-panel-group>
 */
@Component({
  selector: 'alv-panel-group',
  templateUrl: './panel-group.component.html',
  styleUrls: ['./panel-group.component.scss', '../panel/panel-arrow.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelGroupComponent {

  /**
   * if true it shows an arrow on top of the panel
   */
  @Input() showArrow?: boolean;

  /**
   * if true it colorizes the arrow
   */
  @Input() colorizeArrow?: boolean;

}
