import { UserService } from './../user.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    UserService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  private userService = inject(UserService);

  username = new FormControl('');
  password = new FormControl('');

  submit(event: Event) {
    console.log('username:', this.username.value);
    console.log('password:', this.password.value);

    event.preventDefault();

    if (this.username.value && this.password.value) {
      this.userService.signInUser(this.username.value, this.password.value);
    }
  }
}
