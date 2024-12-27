import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Conversation } from '@app/interface/conversation.interface';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private conversations$ = new BehaviorSubject<Conversation[]>([]);
  private http = inject(HttpClient);
  readonly url = environment.apiUrl;

  loadConversations(): void {
    if (this.conversations$.value.length === 0) {
      const headers = this.getHeaders();

      this.http
        .get<Conversation[]>(`${this.url}/conversation`, { headers })
        .subscribe((response) => this.conversations$.next(response));
    }
  }

  createConversation(
    friendCode: string,
    userId: string
  ): Observable<Conversation> {
    const headers = this.getHeaders();
    return this.http.post<Conversation>(
      `${this.url}/conversation`,
      { friendCode, userId },
      { headers }
    );
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (!token) console.error('No token found');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getConversations(): Observable<Conversation[]> {
    return this.conversations$.asObservable();
  }
}
