import { UserService } from './../../services/user.service';
import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { User } from '@app/interface/user.interface';

@Component({
  selector: 'app-my-user',
  imports: [MatIcon],
  templateUrl: './my-user.component.html',
})
export class MyUserComponent {
  private router = inject(Router);
  private userService = inject(UserService);

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
}
