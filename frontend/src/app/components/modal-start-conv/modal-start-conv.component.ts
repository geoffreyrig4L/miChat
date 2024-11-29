import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-modal-start-conv',
  imports: [MatIcon],
  templateUrl: './modal-start-conv.component.html',
})
export class ModalStartConvComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() imgUrl: string = '';
}
