import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Conversation } from '@app/interface/conversation.interface';
import { Message } from '@app/interface/message.interface';
import { User } from '@app/interface/user.interface';
import { ConversationService } from '@app/services/conversation.service';
import { UserService } from '@app/services/user.service';
import { MessageToSendComponent } from '../messageToSend/messageToSend.component';
import { ErrorMessageComponent } from '@app/components/form-validation-message/error-message/error-message.component';
import { SuccessMessageComponent } from '@app/components/form-validation-message/success-message/success-message.component';

@Component({
  selector: 'app-conv',
  imports: [
    MatIconModule,
    CommonModule,
    MessageToSendComponent,
    MatButtonModule,
    ErrorMessageComponent,
    SuccessMessageComponent,
    NgIf,
  ],
  templateUrl: './conv.component.html',
  standalone: true,
})
export class ConvComponent {
  private conversationService = inject(ConversationService);
  private userService = inject(UserService);

  formSubmissionErrorMessage = signal<string>('');
  formSubmissionSuccessMessage = signal<string>('');

  user: User | null = null;

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

    if (!this.user) {
      this.userService.getUser().subscribe((user) => {
        if (!user) {
          this.userService.loadMyUser();
        } else {
          this.user = user;
        }
      });
    }
  }

  deleteConversation() {
    this.conversationService.deleteConversation(this.conv._id).subscribe({
      next: (response: Conversation) => {
        this.formSubmissionSuccessMessage.set(
          'Conversation deleted, redirecting to home page...'
        );

        setTimeout(() => window.location.replace('/'), 3000);
      },
      error: (err) => {
        this.formSubmissionErrorMessage.set(err.error.message);
      },
    });
  }
}
