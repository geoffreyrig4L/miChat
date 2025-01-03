import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MyUserComponent } from '@app/components/my-user/my-user.component';
import { SearchBarComponent } from '@app/components/search-bar/search-bar.component';
import { Conversation } from '@app/interface/conversation.interface';

@Component({
  selector: 'app-conv-list',
  imports: [
    MatDividerModule,
    MatButtonModule,
    NgClass,
    SearchBarComponent,
    MyUserComponent,
  ],
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

  redirectToCreateConvPage() {
    this.router.navigateByUrl('/');
  }
}
