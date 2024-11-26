import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conv',
  imports: [MatIconModule],
  templateUrl: './conv.component.html',
  standalone: true,
})
export class ConvComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user: { name: string; imgUrl: string; online: boolean; lastMsg: string } = {
    name: '',
    imgUrl: '',
    online: false,
    lastMsg: '',
  };

  list: { id: number; name: string; imgUrl: string; lastMsg: string }[] = [
    { id: 1, name: 'Romain Bidault', imgUrl: '', lastMsg: 'message numéro 1' },
    { id: 2, name: 'Geoffrey Rigal', imgUrl: '', lastMsg: 'message numéro 2' },
    { id: 3, name: 'Killian Gassin', imgUrl: '', lastMsg: 'message numéro 3' },
    { id: 4, name: 'Alexis Borges', imgUrl: '', lastMsg: 'message numéro 4' },
  ];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        let userFind = this.list.find(({ id }) => id == params['id']);

        if (userFind) {
          this.user.name = userFind?.name;
          this.user.lastMsg = userFind?.lastMsg;
        } else {
          this.router.navigateByUrl('/');
        }
      }
    });
  }
}
