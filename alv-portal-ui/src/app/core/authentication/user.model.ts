export interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  langKey: string;
  authorities: Array<string>;
}

export interface Credentials {
  username: string;
  password: string;
  rememberMe: boolean;
}
