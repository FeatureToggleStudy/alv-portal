import { User } from '../../../core/auth/user.model';

export interface MenuEntry {
  id: string,
  path: string[];
  labelKey: string;
  icon: string;
  userPredicate: (user: User) => boolean;
  entries?: MenuEntry[];
}

