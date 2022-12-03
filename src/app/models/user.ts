export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: 'driver' | 'passenger';
}

