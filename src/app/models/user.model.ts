export type AuthCredentials = {
  email: string,
  password: string,
  masterPassword: string
}

export type Vault = {
  _id?: string,
  label: string
}

export interface BaseUser {
  name: string;
  verified: boolean;
  tags: string[];
  vaults: Vault[];
}

export interface UpdateUser extends BaseUser{
  password: string,
  masterPassword: string
}

export interface User extends BaseUser{
  email: string;
  _id: string;
}


