import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from '@app/interface/user.interface';
import { UserService } from './../../services/user.service';
import { ErrorMessageComponent } from '../form-validation-message/error-message/error-message.component';
import { SuccessMessageComponent } from '../form-validation-message/success-message/success-message.component';

@Component({
  selector: 'app-my-user',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ErrorMessageComponent,
    SuccessMessageComponent,
  ],
  templateUrl: './my-user.component.html',
})
export class MyUserComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  protected editUser = signal(false);
  private formBuilder = inject(FormBuilder);
  formSubmissionErrorMessage = signal<string>('');
  formSubmissionSuccessMessage = signal<string>('');

  //Validators.minLength(3)
  UpdateUserForm = this.formBuilder.group({
    username: [''],
    password: [null],
  });

  user: User | null = null;

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      if (!user) {
        this.userService.loadMyUser();
      } else {
        this.user = user;
      }
    });
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/sign-in');
  }

  editUserFormOpened() {
    this.editUser.set(!this.editUser());
  }

  submitUpdateUser(event: Event) {
    event.preventDefault();

    if (this.UpdateUserForm.value.password) {
      this.userService
        .updateUser(
          this.UpdateUserForm.value.password,
          this.UpdateUserForm.value.username ?? ''
        )
        .subscribe({
          next: (updatedUser: User) => {
            this.user = updatedUser;
            this.editUser.set(false);
            this.formSubmissionSuccessMessage.set('User updated successfully');
          },
          error: (err) => {
            console.log(err);

            this.formSubmissionErrorMessage.set(err.error.message);
          },
        });
    }
  }
}
