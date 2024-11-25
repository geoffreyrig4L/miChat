import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.isAuthenticated.asObservable();

  signIn(): void {
    console.log('Utilisateur connecté');

    this.isAuthenticated.next(true);
  }

  logout(): void {
    this.isAuthenticated.next(false);
  }

  checkAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }
}
