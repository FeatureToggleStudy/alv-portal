import { AppContext } from './app-context.enum';

export interface AppContextStrategy {
  matches: (appContext: AppContext) => boolean;

  homeUrl: string[];

  logoUrl: string;

  appTitle: string;
}
