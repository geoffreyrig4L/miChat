import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private user = signal<User | null>(null);
  readonly url = environment.apiUrl;

  signInUser(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(this.url + '/user/sign-in', {
        username,
        password,
      })
      .pipe(tap((user) => this.user.set(user)));
  }

  signUpUser(
    username: string,
    password: string,
    email: string
  ): Observable<User> {
    return this.http
      .post<User>(this.url + '/user/sign-up', {
        username,
        password,
        email,
      })
      .pipe(tap((user) => this.user.set(user)));
  }
}
