import { User } from '../../../core/auth/user.model';

export interface MenuEntry {
  path: Array<string>;
  labelKey: string;
  icon: string;
  userPredicate: (user: User) => boolean;
  entries?: Array<MenuEntry>;
}

