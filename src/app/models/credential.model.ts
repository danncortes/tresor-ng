export interface CredentialForm {
  name: string;
  data: Field[];
  tags: string[];
}

export interface CredentialCrypt {
  name: string;
  data: string;
  tags: string[];
}

export interface Credential{
  name: string;
  data: string;
  tags: string[];
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
