export interface CV {
  id: string;
  title: string;
  createdAt: string;
  link: string;
}

export type User = {
  email: string;
  password: string;
  name: string;
  surname: string;
  city: string;
  phoneNumber: string;
  domain: string;
};
