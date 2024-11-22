import { Component, Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from './user.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private user = signal<User | null>(null);
  readonly url = environment.apiUrl + '/users/sign-in';

  signInUser(username: string, password: string): Observable<User> {
    console.log(username, password);

    return this.http
      .post<User>(this.url, {
        username,
        password,
      })
      .pipe(tap((user) => this.user.set(user)));
  }
}
