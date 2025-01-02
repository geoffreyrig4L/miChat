import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-message',
  imports: [NgIf],
  templateUrl: './error-message.component.html',
  standalone: true,
})
export class ErrorMessageComponent {
  @Input() errorMessage: string = '';
}
