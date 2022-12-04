import { User } from '../models/user';

export const USERS: User[] = [
  {id: 1, name: 'Matus', email: 'matus@gmail.com', phone: '+421 950 950 950', password: 'admin', type: 'driver', favorite:[21.2183436, 48.7169856]},
  {id: 2, name: 'Alex', email: 'alex@gmail.com', phone: '+421 950 950 950', password: 'admin', type: 'passenger', favorite: [21.2613315, 48.6996548]},
  {id: 3, name: 'Jan', email: 'jan@gmail.com', phone: '+421 950 950 950', password: 'admin', type: 'passenger'}
];
