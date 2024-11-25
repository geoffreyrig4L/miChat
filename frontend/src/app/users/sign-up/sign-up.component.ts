import { UserService } from './../user.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sign-up',
  imports: [
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  private userService = inject(UserService);

  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');

  submit(event: Event) {
    event.preventDefault();

    if (this.username.value && this.password.value && this.email.value) {
      this.userService
        .signUpUser(this.username.value, this.password.value, this.email.value)
        .subscribe({
          next: (user) => console.log('Utilisateur connecté :', user),
          error: (err) => console.error('Erreur lors de la connexion :', err),
        });
    }
  }
}
