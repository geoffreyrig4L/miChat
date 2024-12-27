import { Injectable } from '@angular/core';
import { SignInResponse } from '@app/interface/signInResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signIn(token: string) {
    localStorage.setItem('token', token);
  }

  checkAuth(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
