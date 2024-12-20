import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Message } from '@app/interface/message.interface';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http = inject(HttpClient);
  readonly url = environment.apiUrl;

  sendMessage(
    idReceiver: string,
    content: string,
    idConversation: string
  ): Observable<Message> {
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Token is missing');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<Message>(
      this.url + '/message',
      {
        receiver: idReceiver,
        content,
        conversation: idConversation,
      },
      { headers }
    );
  }
}
