import { AppContext } from './app-context.enum';
import { User } from '../auth/user.model';

export interface AppContextStrategy {
  matches: (appContext: AppContext) => boolean;

  isDesktopMenuShown: (user: User) => boolean;

  homeUrl: string[];

  logoUrl: string;

  appTitle: string;
}
