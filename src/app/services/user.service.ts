import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { USERS } from '../mocks/mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: User[] = USERS;
  public loggedUser?: User = USERS[1];

  public getUsers(): User[] {
    return this.users;
  }

  public login(email: string, password: string): boolean {
    const user = this.users.find((user) => user.email === email);

    if (user && user.password === password) {
      this.loggedUser = user;
      return true;
    }

    return false
  }

  public checkUserType(userId: number): string {
    console.log(this.users.find((user) => user.id === userId)!.type);
    return this.users.find((user) => user.id === userId)!.type
  }
}
