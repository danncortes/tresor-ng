export type AuthCredentials = {
  email: string,
  password: string,
  masterPassword: string
}

export interface User {
  _id:string;
  name: string;
  email: string;
  verified: boolean;
}
