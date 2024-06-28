export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: {
    name: string;
    id: number
  }
}
