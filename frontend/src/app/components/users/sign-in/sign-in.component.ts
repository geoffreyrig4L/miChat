import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { SignInResponse } from '@app/interface/signInResponse.interface';
import { AuthService } from '@app/services/auth.service';
import { UserService } from '@app/services/user.service';

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
  private authService = inject(AuthService);
  private route = inject(Router);

  username = new FormControl('');
  password = new FormControl('');

  submit(event: Event) {
    event.preventDefault();

    if (this.username.value && this.password.value) {
      this.userService
        .signInUser(this.username.value, this.password.value)
        .subscribe({
          next: (response: SignInResponse) => {
            this.authService.signIn(response.token);
            this.route.navigateByUrl('/');
          },
          error: (err) =>
            alert('Erreur lors de la connexion : \n' + err.message),
        });
    }
  }
}
