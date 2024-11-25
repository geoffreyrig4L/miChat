import { AuthService } from './../../../auth/auth.service';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  private userService = inject(UserService);

  constructor(public authService: AuthService) {}

  username = new FormControl('');
  password = new FormControl('');

  submit(event: Event) {
    event.preventDefault();

    if (this.username.value && this.password.value) {
      this.userService
        .signInUser(this.username.value, this.password.value)
        .subscribe({
          next: (user) => {
            console.log('Utilisateur connecté :', user);

            this.authService.signIn();
            // this.router.navigateByUrl('/');
          },
          error: (err) => console.error('Erreur lors de la connexion :', err),
        });
    }
  }
}
