import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-conv-list',
  imports: [MatDividerModule, MatButtonModule, NgClass, SearchBarComponent],
  templateUrl: './conv-list.component.html',
  standalone: true,
})
export class ConvListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  idConv: null | number = null;

  list: { id: number; name: string; imgUrl: string; lastMsg: string }[] = [
    { id: 1, name: 'Romain Bidault', imgUrl: '', lastMsg: 'message numéro 1' },
    { id: 2, name: 'Geoffrey Rigal', imgUrl: '', lastMsg: 'message numéro 2' },
    { id: 3, name: 'Killian Gassin', imgUrl: '', lastMsg: 'message numéro 3' },
    { id: 4, name: 'Alexis Borges', imgUrl: '', lastMsg: 'message numéro 4' },
  ];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) this.idConv = +params['id'];
    });
  }

  nav(id: number) {
    this.router.navigate(['/' + id]);
  }
}
