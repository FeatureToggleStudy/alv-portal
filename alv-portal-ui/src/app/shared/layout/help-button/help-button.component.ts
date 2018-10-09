import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HelpEntry } from './help-entry.model';

/**
 * Component to display a help button with popover
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @example <alv-help-button
 *            [helpEntries]="[{title: 'Help Title', text: 'Help Text}]"
 *          </alv-help-button>
 */
@Component({
  selector: 'alv-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpButtonComponent {

  /**
   * array of HelpEntry that will be displayed in the popover
   */
  @Input() helpEntries: Array<HelpEntry>;

}
