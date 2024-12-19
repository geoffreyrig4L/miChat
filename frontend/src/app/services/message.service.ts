import { HttpClient } from '@angular/common/http';
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

  sendMessage({
    sender,
    receiver,
    content,
    conversation,
    ...message
  }: Message): Observable<Message> {
    return this.http.post<Message>(this.url + '/message', {
      sender,
      receiver,
      content,
      conversation,
    });
  }
  messages: string[] = [];
}
