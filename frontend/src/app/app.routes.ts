import { Routes } from '@angular/router';
import { SignInComponent } from './components/users/sign-in/sign-in.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { ConvComponent } from './components/conv/conv.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: ':id', component: ConvComponent, canActivate: [authGuard] },
];
