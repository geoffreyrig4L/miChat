import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { SignInResponse } from '@app/interface/signInResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  readonly url = environment.apiUrl;
  private user$ = new BehaviorSubject<User | null>(null);

  signInUser(username: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(this.url + '/auth/sign-in', {
      username,
      password,
    });
  }

  signUpUser(
    username: string,
    password: string,
    email: string
  ): Observable<User> {
    return this.http.post<User>(this.url + '/auth/sign-up', {
      username,
      password,
      email,
    });
  }

  loadMyUser(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is missing');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<User>(`${this.url}/user`, { headers })
      .subscribe((user) => this.user$.next(user));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/user/all');
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }
}
