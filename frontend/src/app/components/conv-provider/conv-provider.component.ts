import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvListComponent } from '../conv-list/conv-list.component';
import { ConvComponent } from '../conv/conv.component';

@Component({
  selector: 'app-conv-provider',
  imports: [ConvListComponent, ConvComponent],
  templateUrl: './conv-provider.component.html',
})
export class ConvProviderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  idConv: null | number = null;

  listConv: { id: number; name: string; imgUrl: string; lastMsg: string }[] = [
    { id: 1, name: 'Romain Bidault', imgUrl: '', lastMsg: 'message numéro 1' },
    { id: 2, name: 'Geoffrey Rigal', imgUrl: '', lastMsg: 'message numéro 2' },
    { id: 3, name: 'Killian Gassin', imgUrl: '', lastMsg: 'message numéro 3' },
    { id: 4, name: 'Alexis Borges', imgUrl: '', lastMsg: 'message numéro 4' },
  ];

  user: { name: string; imgUrl: string; online: boolean; lastMsg: string } = {
    name: '',
    imgUrl: '',
    online: false,
    lastMsg: '',
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.idConv = +params['id'];
        let userFind = this.listConv.find(({ id }) => id == params['id']);

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
