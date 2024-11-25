import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { ConvListComponent } from '@app/components/conv-list/conv-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, ConvListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
