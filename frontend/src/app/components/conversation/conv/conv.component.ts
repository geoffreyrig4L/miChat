import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Conversation } from '@app/interface/conversation.interface';
import { Message } from '@app/interface/message.interface';
import { MessageToSendComponent } from '../messageToSend/messageToSend.component';
import { ConversationService } from '@app/services/conversation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conv',
  imports: [
    MatIconModule,
    CommonModule,
    MessageToSendComponent,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './conv.component.html',
  standalone: true,
})
export class ConvComponent {
  private conversationService = inject(ConversationService);
  private router = inject(Router);

  formSubmissionErrorMessage = signal<string>('');

  @Input() conv: Conversation = {
    _id: '',
    created_at: new Date(),
    updated_at: new Date(),
    messages: [],
    interlocutor: {
      _id: '',
      username: '',
      imgUrl: '',
      online: false,
    },
  };

  reloadMessages(item: Message) {
    this.conv?.messages.push(item);
  }

  ngOnInit() {
    if (this.conv) {
      this.conv.messages = this.conv?.messages.sort(
        (a: Message, b: Message) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        }
      );
    }
  }

  deleteConversation() {
    //TODO affiche l'erreur, je pense que c'est parce qu'on charge la conv alors qu'elle est dead

    this.conversationService.deleteConversation(this.conv._id).subscribe({
      next: (response: String) => {
        console.log(response);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.formSubmissionErrorMessage.set(err.error.message);
      },
    });
  }
}
