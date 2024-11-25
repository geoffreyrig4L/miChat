import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { SignInComponent } from './features/sign-in/sign-in.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, ListComponent, SignInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'miChat';

  isAuth: boolean = false;
}
