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
  readonly url = environment.apiUrl + '/user/sign-in';

  signInUser(username: string, password: string): Observable<User> {
    console.log(this.url);
    console.log(username, password);

    return this.http
      .post<User>(this.url, {
        username,
        password,
      })
      .pipe(tap((user) => this.user.set(user)));
  }
}
