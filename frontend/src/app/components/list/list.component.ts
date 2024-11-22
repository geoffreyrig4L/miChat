import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-list',
  imports: [MatDividerModule, MatButtonModule],
  templateUrl: './list.component.html',
  standalone: true,
})
export class ListComponent {
  list: { name: string; imgUrl: string; lastMsg: string }[] = [
    { name: 'Romain Bidault', imgUrl: '', lastMsg: 'message numéro 1' },
    { name: 'Geoffrey Rigal', imgUrl: '', lastMsg: 'message numéro 2' },
    { name: 'Killian Gassin', imgUrl: '', lastMsg: 'message numéro 3' },
    { name: 'Alexis Borges', imgUrl: '', lastMsg: 'message numéro 4' },
  ];
}
