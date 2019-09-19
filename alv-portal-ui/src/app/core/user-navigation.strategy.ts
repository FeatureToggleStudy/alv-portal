import { User } from './auth/user.model';

export interface UserNavigationStrategy {
  matches: (user: User) => boolean;

  navigate: () => Promise<boolean>;
}
