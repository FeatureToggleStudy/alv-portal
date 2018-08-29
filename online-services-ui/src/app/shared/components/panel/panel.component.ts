import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HelpEntry } from '../help-button/help-entry.model';

/**
 * Component to display a (form) panel.
 * Use the CSS class "panel-title" and "panel-subtitle" to style the title and subtitle of the panel (see example).
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @param panelTitle    (optional) the title of the panel
 * @param panelSubtitle (optional) the subtitle of the panel
 * @param helpEntries   (optional) help texts to be displayed by help button
 * @param showArrow     (optional) if true it shows an arrow on top of the panel
 * @param colorizeArrow (optional) if true it colorizes the arrow
 * @param invalid       (optional) if true the panel border and panel title are both red
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

  @Input() panelTitle?: string;
  @Input() panelSubtitle?: string;
  @Input() helpEntries?: Array<HelpEntry>;
  @Input() showArrow?: boolean;
  @Input() colorizeArrow?: boolean;
  @Input() invalid?: boolean;

}
