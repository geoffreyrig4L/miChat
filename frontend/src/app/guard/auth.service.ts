import { Injectable } from '@angular/core';
import { User } from '@app/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signIn(user: User) {
    localStorage.setItem('token', 'token');
  }

  logout() {}

  checkAuth(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
