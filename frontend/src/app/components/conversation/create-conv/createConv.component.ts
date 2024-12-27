import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Conversation } from '@app/interface/conversation.interface';
import { User } from '@app/interface/user.interface';
import { ConversationService } from '@app/services/conversation.service';
import { UserService } from '@app/services/user.service';

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isValid = /^[0-9]+$/.test(value);
    return isValid ? null : { numeric: true };
  };
}

@Component({
  selector: 'create-conv',
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    ClipboardModule,
    MatDividerModule,
    NgIf,
  ],
  templateUrl: './createConv.component.html',
  standalone: true,
})
export class CreateConv {
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private conversationService = inject(ConversationService);
  formSubmissionErrorMessage = signal<string>('');

  protected copied = signal(false);

  createConvForm = this.formBuilder.group({
    friendCode: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(6),
          numericValidator(),
        ],
      },
    ],
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

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.createConvForm.value.friendCode && this.user?._id) {
      this.conversationService
        .createConversation(
          this.createConvForm.value.friendCode,
          this.user?._id
        )
        .subscribe({
          next: (response: Conversation) => {
            //TODO marche avec mais pas sans le log (des fois)
            console.log(response._id);

            this.router.navigate(['/', response._id]);
          },
          error: (err) => {
            console.log('log');

            this.formSubmissionErrorMessage.set(err.error.message);
          },
        });
    }
  }
}
