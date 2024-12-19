import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { SearchBarComponent } from '@app/components/search-bar/search-bar.component';
import { Conversation } from '@app/interface/conversation.interface';

@Component({
  selector: 'app-conv-list',
  imports: [MatDividerModule, MatButtonModule, NgClass, SearchBarComponent],
  templateUrl: './conv-list.component.html',
  standalone: true,
})
export class ConvListComponent {
  private router = inject(Router);

  @Input() idConv: null | string = null;

  @Input() listConv: Conversation[] = [];

  nav(id: string) {
    this.router.navigate(['/' + id]);
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/sign-in');
  }
}
