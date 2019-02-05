import { User } from '../../../core/auth/user.model';
import { IconKey } from '../custom-icon/custom-icon.component';

export interface MenuEntry {
  id: string;
  path: string[];
  labelKey: string;
  iconClass?: string;
  iconKey?: IconKey;
  userPredicate: (user: User) => boolean;
  entries?: MenuEntry[];
}

