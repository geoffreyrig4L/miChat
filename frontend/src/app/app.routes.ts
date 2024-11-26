import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/users/sign-in/sign-in.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { authGuard } from './guard/auth.guard';
import { ConvListComponent } from './components/conv-list/conv-list.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: ConvListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
