import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-modal-start-conv',
  imports: [MatIcon],
  templateUrl: './modal-start-conv.component.html',
})
export class ModalStartConvComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() imgUrl: string = '';
}
