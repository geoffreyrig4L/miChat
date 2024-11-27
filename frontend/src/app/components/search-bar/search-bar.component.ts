import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalStartConvComponent } from '../modal-start-conv/modal-start-conv.component';

@Component({
  selector: 'app-search-bar',
  imports: [MatIconModule, ModalStartConvComponent],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  userSelectedId = NaN;
  userSelectedName = '';
  userSelectedImgUrl = '';

  list: { id: number; name: string; imgUrl: string; lastMsg: string }[] = [
    { id: 1, name: 'Romain Bidault', imgUrl: '', lastMsg: 'message numéro 1' },
    { id: 2, name: 'Geoffrey Rigal', imgUrl: '', lastMsg: 'message numéro 2' },
    { id: 3, name: 'Killian Gassin', imgUrl: '', lastMsg: 'message numéro 3' },
    { id: 4, name: 'Alexis Borges', imgUrl: '', lastMsg: 'message numéro 4' },
  ];

  test(user: { id: number; name: string; imgUrl: string; lastMsg: string }) {
    this.userSelectedId = user.id;
    this.userSelectedName = user.name;
    this.userSelectedImgUrl = user.imgUrl;
  }
}
