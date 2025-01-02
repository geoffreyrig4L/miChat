import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'success-message',
  imports: [NgIf, MatIcon],
  templateUrl: './success-message.component.html',
  standalone: true,
})
export class SuccessMessageComponent {
  @Input() successMessage: string = '';
}
