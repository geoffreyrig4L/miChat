import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { UserService } from './../user.service';

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
  private route = inject(Router);

  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');

  submit(event: Event) {
    event.preventDefault();

    if (this.username.value && this.password.value && this.email.value) {
      this.userService
        .signUpUser(this.username.value, this.password.value, this.email.value)
        .subscribe({
          next: () => {
            this.route.navigateByUrl('/sign-in');
          },
          error: (err) => console.error('Erreur lors de la connexion :', err),
        });
    }
  }
}
