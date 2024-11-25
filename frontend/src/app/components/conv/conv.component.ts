import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-conv',
  imports: [MatIconModule],
  templateUrl: './conv.component.html',
  standalone: true,
  styles: [
    `
      :host {
        flex: 1;
      }
    `,
  ],
})
export class ConvComponent {
  user: { name: string; imgUrl: string; online: boolean } = {
    name: 'Romain Bidault',
    imgUrl: '',
    online: true,
  };
}
