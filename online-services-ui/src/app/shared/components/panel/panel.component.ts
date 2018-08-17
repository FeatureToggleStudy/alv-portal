import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Component to display a (form) panel.
 * Use the CSS class "panel-title" and "panel-subtitle" to style the title and subtitle of the panel (see example).
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @param showArrow     if true it shows an arrow on top of the panel
 * @param colorizeArrow if true it colorizes the arrow
 * @param invalid       if true the panel border and panel title are both red
 * @example <os-panel [showArrow]="true" [colorizeArrow]="true" [invalid]="true">
 *            <div class="panel-title">This is the panel title.
 *              <span class="panel-subtitle"> Optional."</span>
 *            </div>
 *            <div>...</div>
 *          </os-panel>
 */
@Component({
  selector: 'os-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss', './panel-arrow.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent {

  @Input() showArrow?: boolean;
  @Input() colorizeArrow?: boolean;
  @Input() invalid?: boolean;

}
