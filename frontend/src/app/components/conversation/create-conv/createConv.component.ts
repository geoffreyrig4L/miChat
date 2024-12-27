import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '@app/interface/user.interface';
import { UserService } from '@app/services/user.service';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'create-conv',
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ClipboardModule,
  ],
  templateUrl: './createConv.component.html',
  standalone: true,
})
export class CreateConv {
  private userService = inject(UserService);
  protected copied = signal(false);

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
}
