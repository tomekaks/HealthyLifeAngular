export interface User {
  id: string;
  userName: string;
  email: string;
  token: string;
  roles: string[];
  succeded: boolean;
  errors: string[];
}
