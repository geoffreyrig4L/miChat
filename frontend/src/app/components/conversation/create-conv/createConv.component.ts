import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '@app/interface/user.interface';
import { UserService } from '@app/services/user.service';
import { MatDividerModule } from '@angular/material/divider';
import { ConversationService } from '@app/services/conversation.service';
import { Router } from '@angular/router';
import { Conversation } from '@app/interface/conversation.interface';

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
  ],
  templateUrl: './createConv.component.html',
  standalone: true,
})
export class CreateConv {
  private userService = inject(UserService);
  private router = inject(Router);
  private conversationService = inject(ConversationService);
  protected copied = signal(false);

  friendCode = new FormControl('');

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

  submit(event: Event) {
    event.preventDefault();
    if (this.friendCode.value && this.user?._id) {
      this.conversationService
        .createConversation(this.friendCode.value, this.user?._id)
        .subscribe({
          next: (response: Conversation) => {
            //TODO marche avec mais pas sans le log
            console.log(response._id);

            this.router.navigate(['/', response._id]);
          },
          error: (err: Error) => console.error(err.message),
        });
    }
  }
}
