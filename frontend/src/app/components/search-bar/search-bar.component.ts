import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  imports: [MatIconModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  userSelected: null | {
    id: number;
    name: string;
    imgUrl: string;
    lastMsg: string;
  } = null;

  list: { id: number; name: string; imgUrl: string; lastMsg: string }[] = [
    { id: 1, name: 'Romain Bidault', imgUrl: '', lastMsg: 'message numéro 1' },
    { id: 2, name: 'Geoffrey Rigal', imgUrl: '', lastMsg: 'message numéro 2' },
    { id: 3, name: 'Killian Gassin', imgUrl: '', lastMsg: 'message numéro 3' },
    { id: 4, name: 'Alexis Borges', imgUrl: '', lastMsg: 'message numéro 4' },
  ];

  test(user: { id: number; name: string; imgUrl: string; lastMsg: string }) {
    this.userSelected = user;
  }
}
