import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-conv-list',
  imports: [MatDividerModule, MatButtonModule, NgClass, SearchBarComponent],
  templateUrl: './conv-list.component.html',
  standalone: true,
})
export class ConvListComponent {
  private router = inject(Router);

  @Input() idConv: null | number = null;

  @Input() listConv: {
    id: number;
    name: string;
    imgUrl: string;
    lastMsg: string;
  }[] = [];

  nav(id: number) {
    this.router.navigate(['/' + id]);
  }
}
