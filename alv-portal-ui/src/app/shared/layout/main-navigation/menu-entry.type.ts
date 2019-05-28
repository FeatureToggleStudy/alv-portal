import { User } from '../../../core/auth/user.model';
import { IconKey } from '../../icons/custom-icon/custom-icon.component';

export interface MenuEntry {
  id: string;
  path: string[];
  labelKey: string;
  iconClass?: string;
  iconKey?: IconKey;
  userPredicate: (user: User) => boolean;
  entries?: MenuEntry[];
}

export interface MenuDefinition {
  mainMenuEntries: MenuEntry[];
  onlineFormsMenuEntries: MenuEntry[];
  settingsMenuEntries: MenuEntry[];
}
