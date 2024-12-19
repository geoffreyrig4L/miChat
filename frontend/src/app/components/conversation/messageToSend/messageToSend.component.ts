import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message-to-send',
  imports: [MatIconModule, CommonModule],
  templateUrl: './messageToSend.component.html',
  standalone: true,
})
export class MessageToSendComponent {
  messageToSend = new FormControl('');

  sendMessage(event: Event) {
    event.preventDefault();

    if (this.messageToSend.value) {
      console.log(this.messageToSend.value);

      // Send message
    }
  }
}
