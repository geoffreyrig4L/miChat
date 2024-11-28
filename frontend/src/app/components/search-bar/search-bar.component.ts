import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '@app/interface/user.interface';
import { UserService } from '@app/services/user.service';
import { ModalStartConvComponent } from '../modal-start-conv/modal-start-conv.component';

@Component({
  selector: 'app-search-bar',
  imports: [MatIconModule, ModalStartConvComponent],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit {
  private userService = inject(UserService);

  userSelectedId = NaN;
  userSelectedName = '';
  userSelectedImgUrl = '';

  // list: { id: number; name: string; imgUrl: string; lastMsg: string }[] = [
  //   { id: 1, name: 'Romain Bidault', imgUrl: '', lastMsg: 'message numéro 1' },
  //   { id: 2, name: 'Geoffrey Rigal', imgUrl: '', lastMsg: 'message numéro 2' },
  //   { id: 3, name: 'Killian Gassin', imgUrl: '', lastMsg: 'message numéro 3' },
  //   { id: 4, name: 'Alexis Borges', imgUrl: '', lastMsg: 'message numéro 4' },
  // ];

  list = this.userService.users;

  selectUser(user: User) {
    this.userSelectedId = user.id;
    this.userSelectedName = user.username;
    this.userSelectedImgUrl = '';
  }

  ngOnInit() {
    this.userService.getUsers().subscribe();
  }
}
