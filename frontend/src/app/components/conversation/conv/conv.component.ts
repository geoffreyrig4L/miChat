import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Message } from '@app/interface/message.interface';

@Component({
  selector: 'app-conv',
  imports: [MatIconModule],
  templateUrl: './conv.component.html',
  standalone: true,
})
export class ConvComponent {
  @Input() user: {
    name: string;
    imgUrl: string;
    online: boolean;
    lastMsg: string;
  } = {
    name: '',
    imgUrl: '',
    online: false,
    lastMsg: '',
  };

  @Input() messages: Message[] = [];
}
