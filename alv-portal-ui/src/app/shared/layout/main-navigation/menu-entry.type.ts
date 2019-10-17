import { User } from '../../../core/auth/user.model';
import { IconKey } from '../../icons/custom-icon/custom-icon.component';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface MenuEntry {
  id: string;
  path: string[];
  labelKey: string;
  iconProp?: IconProp;
  iconKey?: IconKey;
  userPredicate: (user: User) => boolean;
  entries?: MenuEntry[];
}

export interface MenuDefinition {
  mainMenuEntries: MenuEntry[];
  onlineFormsMenuEntries: MenuEntry[];
  settingsMenuEntries: MenuEntry[];
}
