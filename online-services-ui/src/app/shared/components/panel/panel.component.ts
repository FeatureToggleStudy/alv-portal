import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HelpEntry } from '../help-button/help-entry.model';

/**
 * Component to display a (form) panel.
 * Use the CSS class "panel-title" and "panel-subtitle" to style the title and subtitle of the panel (see example).
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).ß
 * @example <os-panel [panelTitle]="'Panel Title'"
 *                    [helpEntries]="[{title: 'Help Title', text: 'Help Text}]"
 *                    [showArrow]="true"
 *                    [colorizeArrow]="true"
 *                    [invalid]="true">
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

  /**
   * (optional) the title of the panel
   */
  @Input() panelTitle?: string;

  /**
   * (optional) the subtitle of the panel
   */
  @Input() panelSubtitle?: string;

  /**
   * (optional) help texts to be displayed by help button
   */
  @Input() helpEntries?: Array<HelpEntry>;

  /**
   * (optional) if true it shows an arrow on top of the panel
   */
  @Input() showArrow?: boolean;

  /**
   * (optional) if true it colorizes the arrow
   */
  @Input() colorizeArrow?: boolean;

  /**
   * (optional) if true the panel border and panel title are both red
   */
  @Input() invalid?: boolean;

}
