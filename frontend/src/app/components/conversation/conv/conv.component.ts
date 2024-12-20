import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Message } from '@app/interface/message.interface';
import { MessageToSendComponent } from '../messageToSend/messageToSend.component';
import { Participant } from '@app/interface/participant.interface';
import { Conversation } from '@app/interface/conversation.interface';

@Component({
  selector: 'app-conv',
  imports: [MatIconModule, CommonModule, MessageToSendComponent],
  templateUrl: './conv.component.html',
  standalone: true,
})
export class ConvComponent {
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
}
