import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sign-in',
  imports: [
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  username = new FormControl('');
  password = new FormControl('');

  submit(event: Event) {
    event.preventDefault();
    console.log('username:', this.username.value);
    console.log('password:', this.password.value);
  }
}
