import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MessageService } from '@app/services/message.service';

@Component({
  selector: 'app-message-to-send',
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './messageToSend.component.html',
  standalone: true,
})
export class MessageToSendComponent {
  private messageService = inject(MessageService);
  private router = inject(Router);
  messageToSend = new FormControl('');

  @Input() idConv: string = '';
  @Input() idInterlocutor: string = '';
  @Input() reloadMessages!: (item: Message) => void;

  sendMessage(event: Event) {
    event.preventDefault();

    if (this.messageToSend.value) {
      this.messageService
        .sendMessage(this.idInterlocutor, this.messageToSend.value, this.idConv)
        .subscribe({
          next: (res) => {
            this.messageToSend.setValue('');
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
