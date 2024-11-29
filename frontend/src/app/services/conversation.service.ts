import { HttpClient } from '@angular/common/http';
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

  getOwnConversations(id: string): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.url + '/conversation/' + id);
  }

  loadConversations(id: string): void {
    if (this.conversations$.value.length === 0) {
      this.http
        .get<Conversation[]>(`${this.url}/conversation/${id}`)
        .subscribe((response) => this.conversations$.next(response));
    }
  }

  getConversations(): Observable<Conversation[]> {
    return this.conversations$.asObservable();
  }
}
