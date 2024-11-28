import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  public users = signal<User[]>([]);
  readonly url = environment.apiUrl;

  signInUser(username: string, password: string): Observable<User> {
    return this.http.post<User>(this.url + '/user/sign-in', {
      username,
      password,
    });
  }

  signUpUser(
    username: string,
    password: string,
    email: string
  ): Observable<User> {
    return this.http.post<User>(this.url + '/user/sign-up', {
      username,
      password,
      email,
    });
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url + '/user/all')
      .pipe(tap((users) => this.users.set(users)));
  }
}
