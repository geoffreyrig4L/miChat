import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  signIn() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  checkAuth(): boolean {
    return this.isAuthenticated;
  }
}
