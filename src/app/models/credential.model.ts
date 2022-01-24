import { Vault } from './user.model';

export interface CredentialBase {
  vault: Vault['_id'] | null;
  name: string;
  tags: string[];

}

export interface CredentialForm extends CredentialBase {
  data: Field[];
}

export interface CredentialCrypt extends CredentialBase {
  data: string;
}

export interface Credential extends CredentialCrypt {
  _id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Field {
  name: string;
  data: string | number;
  type: FieldType
}

export const fieldTypes = {
  username: 'Username',
  password: 'Password',
  text: 'Text',
  longtext: 'Long Text',
  address: 'Address',
  url: 'Url',
  email: 'Email'
};

export type FieldType = keyof typeof fieldTypes;
